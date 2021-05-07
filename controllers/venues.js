const Venue = require('../models/Venue');
const Event = require('../models/Event');

async function all(req, res) {
  const venues = await Venue.find({})
    .populate('reviews.createdBy', 'username')
    .exec();
  res.render('venues/index', { title: 'Venues', venues });
}

function add(req, res) {
  if (req.session.user) {
    res.render('venues/add', { title: 'Add Venue' });
  } else {
    res.redirect('/');
  }
}

async function show(req, res) {
  try {
    const venue = await Venue.findById(req.params.id)
      .populate('reviews.createdBy', 'username')
      .exec();
    res.render('venues/show', { title: 'Venue', venue });
  } catch (err) {
    res.status(500).send('Something went Wrong!');
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

async function deleteOne(req, res) {
  try {
    // await Event.deleteMany({ venue: req.params.id });
    let venue = await Venue.findById(req.params.id);
    await venue.remove();
    res.redirect('/venues');
  } catch (err) {
    res.status(500).send('Something went Wrong!');
  }
}
module.exports = { all, add, create, edit, update, show, delete: deleteOne };
