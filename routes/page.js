const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('main', { title: 'Jobs-App', main: true });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Jobs-App || login' });
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Jobs-App || register' });
});

module.exports = router;
