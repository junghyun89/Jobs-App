const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/check-loggedIn');
const User = require('../schemas/user');

router.post('/login', (req, res) => {
  res.render('login', { title: 'Jobs-App || login' });
});

router.post('/register', isNotLoggedIn, async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    const exUser = User.findOne({ email: email });
    console.log('------', exUser);
    if (exUser) {
      return res.redirect('/register?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      name,
      password: hash,
    });
    return res.redirect('/login');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
