const Venue = require('../models/Venue');

async function all(req, res) {
  const venues = await Venue.find({});
  res.render('venues/index', { title: 'Venues', venues });
}

module.exports = { all };
