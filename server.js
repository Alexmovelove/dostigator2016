const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mainRoutes = require('./routes/main');
const goalsRoutes = require('./routes/goals');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static('public'));

// Использование маршрутов
app.use('/', mainRoutes);
app.use('/goals', goalsRoutes);
app.use('/auth', authRoutes);

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
