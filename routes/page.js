const express = require('express');
const router = express.Router();
const Job = require('../schemas/job');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/check-loggedIn');

router.use(async (req, res, next) => {
  const jobs = await Job.find({ createdBy: req.user?._id });
  res.locals.user = req.user;
  res.locals.jobs = jobs.length === 0 ? null : jobs;
  next();
});

router.get('/', (req, res) => {
  res.render('main', { title: 'Jobs-App', main: true });
});

router.get('/jobs/:id', isLoggedIn, async (req, res) => {
  const job = await Job.findById({ _id: req.params.id });
  res.render('update', { title: 'Jobs-App || job-update', job });
});

router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('login', { title: 'Jobs-App || login' });
});

router.get('/register', isNotLoggedIn, (req, res) => {
  res.render('register', { title: 'Jobs-App || register' });
});

module.exports = router;
