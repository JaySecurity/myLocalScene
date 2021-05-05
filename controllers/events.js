const Event = require('../models/Event');
const Venue = require('../models/Venue');
const Artist = require('../models/Artist');

async function all(req, res) {
  const events = await Event.find({})
    .populate('venue artists')
    .where('dateTime')
    .gte(Date.now())
    .sort('dateTime')
    .exec();
  res.render('events/index', { title: 'Events', events });
}

async function show(req, res) {
  try {
    const event = await Event.findById(req.params.id)
      .populate('venue artists')
      .exec();
    res.render('events/show', { title: 'Event View', event });
  } catch (err) {
    res.status(500).send('Something went Wrong!');
  }
}

async function add(req, res) {
  try {
    const artists = await Artist.find({}).sort('name');
    const venues = await Venue.find({}).sort('name');
    res.render('events/add', { title: 'Add Event', artists, venues });
  } catch (err) {
    res.status(500).send('Something Went Wrong');
  }
}

async function create(req, res) {
  try {
    const newEvent = new Event(req.body);
    let artists = JSON.parse(req.body.artists);
    newEvent.artists = [...artists];
    newEvent.createdBy = req.session.user;
    await newEvent.save();
    res.redirect('/events');
  } catch (err) {
    res.status(500).send('Something Went Wrong');
  }
}

async function edit(req, res) {
  try {
    const event = await Event.findById(req.params.id)
      .populate('venue', 'name')
      .populate('artists', 'name')
      .exec();
    const artists = await Artist.find({ _id: { $nin: event.artists } }).sort(
      'name'
    );
    const venues = await Venue.find({}).sort('name');
    res.render('events/edit', { title: 'Edit Event', event, artists, venues });
  } catch (err) {
    res.status(500).send('Something Went Wrong!');
  }
}

async function update(req, res) {
  try {
    let artists = JSON.parse(req.body.artists);
    await Event.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      dateTime: req.body.dateTime,
      coverCharge: req.body.coverCharge,
      venue: req.body.venue,
      artists: [...artists],
      poster: req.body.poster,
    });
    res.redirect('/events');
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function deleteOne(req, res) {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect('/events');
  } catch (err) {
    res.status(500).send('Something went Wrong');
  }
}

module.exports = { all, add, create, edit, update, show, delete: deleteOne };
