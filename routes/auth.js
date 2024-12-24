const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database');
const path = require('path');
const router = express.Router();

// Страница регистрации
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'register.html'));
});

// Страница входа
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

// Регистрация пользователя
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Имя пользователя и пароль обязательны.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;

  db.run(query, [username, hashedPassword], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Ошибка регистрации.' });
    }
    res.status(201).send('<h1>Регистрация успешна!</h1><a href="/auth/login">Войти</a>');
  });
});

// Авторизация пользователя
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ?`;

  db.get(query, [username], async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Неверные имя пользователя или пароль.' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Неверные имя пользователя или пароль.' });
    }
    req.session.user = { id: user.id, username: user.username };
    res.send('<h1>Вы успешно вошли!</h1><a href="/">На главную</a>');
  });
});

// Выход из системы
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при выходе из системы.' });
    }
    res.send('<h1>Вы успешно вышли!</h1><a href="/">На главную</a>');
  });
});

module.exports = router;
