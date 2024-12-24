const express = require('express');
const db = require('../database');
const router = express.Router();

// Получение целей пользователя
router.get('/', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Необходима авторизация.' });
  }
  const query = `SELECT * FROM goals WHERE user_id = ?`;

  db.all(query, [req.session.user.id], (err, goals) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при получении целей.' });
    }
    res.json(goals);
  });
});

// Добавление новой цели
router.post('/', (req, res) => {
  const { goal, criteria } = req.body;
  if (!req.session.user) {
    return res.status(401).json({ error: 'Необходима авторизация.' });
  }
  const query = `INSERT INTO goals (user_id, goal, criteria) VALUES (?, ?, ?)`;

  db.run(query, [req.session.user.id, goal, criteria], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при добавлении цели.' });
    }
    res.status(201).json({ message: 'Цель добавлена.', id: this.lastID });
  });
});

module.exports = router;
