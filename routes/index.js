const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET home page. */
router.get('/', async function (req, res, next) {
  return res.render('index', { title: 'My Local Scene' });
});

router.get('/events', (req, res) => {
  if (req.query) res.redirect('/users/login');
});
module.exports = router;
