const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET home page. */
router.get('/', async function (req, res, next) {
  return res.render('index', { title: 'My Local Scene' });
});

module.exports = router;
