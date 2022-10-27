const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('main', { title: 'Jobs-App', main: true });
});

router.get('/:id', (req, res) => {
  res.render('update', { title: 'Jobs-App', main: true });
});

module.exports = router;
