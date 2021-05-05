const Event = require('../../models/Event');
const Venue = require('../../models/Venue');
const Artist = require('../../models/Artist');

async function venues(req, res) {
  try {
    let search = new RegExp(req.query.search, 'i');
    const venues = await Venue.find({}).where('name', search);
    res.status(200).json(venues);
  } catch (err) {
    res.status(500).json({ msg: 'Something went Wrong!' });
  }
}

async function artists(req, res) {
  try {
    let search = new RegExp(req.query.search, 'i');
    const artists = await Artist.find({}).where('name', search);
    res.status(200).json(artists);
  } catch (err) {
    res.status(500).json({ msg: 'Something went Wrong!' });
  }
}
async function events(req, res) {
  try {
    let search = new RegExp(req.query.search, 'i');
    const events = await Event.find({})
      .populate('venue artists')
      .or([{ name: search }, { description: search }])
      .where('dateTime')
      .gte(Date.now())
      .sort('dateTime')
      .exec();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ msg: 'Something went Wrong!' });
  }
}

module.exports = { events, venues, artists };
