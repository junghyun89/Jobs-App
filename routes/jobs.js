const express = require('express');
const router = express.Router();
const Job = require('../schemas/job');
const { isLoggedIn } = require('../middleware/check-loggedIn');

router.delete('/:id', isLoggedIn, async (req, res) => {
  await Job.findByIdAndDelete({ _id: req.params.id });
  res.send('ok');
});

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const { company, position } = req.body;
    await Job.create({
      company,
      position,
      createdBy: req.user._id,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.patch('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const { company, position, status } = req.body;
    await Job.findOneAndUpdate(
      { _id: req.params.id },
      { company, position, status }
    );
    res.send('ok');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
