const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const userId = req.cookies.user;
  if (userId) {
    const user = await User.findById(userId);
    return res.render('index', { title: 'My Local Scene', user });
  } else {
    return res.render('index', { title: 'My Local Scene' });
  }
});

module.exports = router;
