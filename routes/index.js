const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const results = await Event.find({})
      .populate('venue artists')
      .where('dateTime')
      .gte(Date.now())
      .sort('dateTime')
      .exec();
    return res.render('index', { title: 'My Local Scene', results });
  } catch (err) {
    res.status(500).send('Something went Wrong');
  }
});

module.exports = router;
