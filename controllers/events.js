const Event = require('../models/Event');
const Venue = require('../models/Venue');
const Artist = require('../models/Artist');

async function all(req, res) {
  const events = await Event.find({});
  res.render('events/index', { title: 'Events', events });
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
    await newEvent.save();
    res.redirect('/events');
  } catch (err) {
    res.status(500).send('Something Went Wrong');
  }
}

module.exports = { all, add, create };
