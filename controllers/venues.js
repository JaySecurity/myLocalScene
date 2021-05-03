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

async function edit(req, res) {
  const venue = await Venue.findById(req.params.id);
  if (!venue) {
    req.session.message = 'Venue Not Found';
    res.render('venues/edit', { title: 'Edit Venue' });
    req.session.message = '';
  } else {
    res.render('venues/edit', { title: 'Edit Venue', venue });
  }
}

async function update(req, res) {
  try {
    await Venue.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/venues');
  } catch (err) {
    res.status(500).send('Something Went Wrong');
  }
}

module.exports = { all, add, create, edit, update };
