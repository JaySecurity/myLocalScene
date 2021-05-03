const Venue = require('../models/Venue');

async function all(req, res) {
  const venues = await Venue.find({});
  res.render('venues/index', { title: 'Venues', venues });
}

function add(req, res) {
  if (req.session.user) {
    res.render('venues/add', { title: 'Add Venue' });
  } else {
    res.redirect('/');
  }
}

async function create(req, res) {
  try {
    const newVenue = await new Venue(req.body);
    newVenue.createdBy = req.session.user;
    await newVenue.save();
    res.redirect('/venues');
  } catch (err) {
    res.status(500).send('Something went Wrong...');
  }
}

module.exports = { all, add, create };
