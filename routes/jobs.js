const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.render('update', { title: 'Jobs-App', main: true });
});

module.exports = router;
