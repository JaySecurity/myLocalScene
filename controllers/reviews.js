const { findById } = require('../models/Artist');
const Artist = require('../models/Artist');
const Venue = require('../models/Venue');

function artistAdd(req, res) {
  res.render('reviews/add', { title: 'Add a Review', id: req.params.id });
}

async function artistCreate(req, res) {
  try {
    let artist = await Artist.findById(req.params.id);
    let review = {
      content: req.body.content,
      rating: req.body.rating,
      createdBy: req.session.user,
    };
    artist.reviews.push(review);
    await artist.save();
    res.redirect('/artists');
  } catch (err) {
    res.status(500).send('Something went Wrong');
  }
}

module.exports = { artistAdd, artistCreate };
