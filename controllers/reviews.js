const Artist = require('../models/Artist');
const Venue = require('../models/Venue');

function artistAdd(req, res) {
  res.render('reviews/artistAdd', { title: 'Add a Review', id: req.params.id });
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

async function artistEdit(req, res) {
  try {
    const artist = await Artist.findOne({ 'reviews._id': req.params.id });
    const review = artist.reviews.id(req.params.id);
    res.render('reviews/artistEdit', {
      title: 'Edit Review',
      artistId: artist._id,
      review,
    });
  } catch (err) {
    res.status(500).send('Something went Wrong!');
  }
}

async function artistUpdate(req, res) {
  try {
    const artist = await Artist.findById(req.params.aId);
    const review = artist.reviews.id(req.params.rId);
    review.rating = req.body.rating;
    review.content = req.body.content;
    await artist.save();
    res.redirect('/artists');
  } catch (err) {
    res.status(500).send('Something went Wrong!!');
  }
}

async function artistDelete(req, res) {
  try {
    const artist = await Artist.findOne({ 'reviews._id': req.params.id });
    artist.reviews.id(req.params.id).remove();
    await artist.save();
    res.redirect('/artists');
  } catch (err) {
    res.status(500).send('Something went Wrong!!');
  }
}

// Venue Review Functions

function venueAdd(req, res) {
  res.render('reviews/venueAdd', { title: 'Add a Review', id: req.params.id });
}

async function venueCreate(req, res) {
  try {
    let venue = await Venue.findById(req.params.id);
    let review = {
      content: req.body.content,
      rating: req.body.rating,
      createdBy: req.session.user,
    };
    venue.reviews.push(review);
    await venue.save();
    res.redirect('/venues');
  } catch (err) {
    res.status(500).send('Something went Wrong');
  }
}

async function venueEdit(req, res) {
  try {
    const venue = await Venue.findOne({ 'reviews._id': req.params.id });
    const review = venue.reviews.id(req.params.id);
    res.render('reviews/venueEdit', {
      title: 'Edit Review',
      venueId: venue._id,
      review,
    });
  } catch (err) {
    res.status(500).send('Something went Wrong!');
  }
}

async function venueUpdate(req, res) {
  try {
    const venue = await Venue.findById(req.params.vId);
    const review = venue.reviews.id(req.params.rId);
    review.rating = req.body.rating;
    review.content = req.body.content;
    await venue.save();
    res.redirect('/venues');
  } catch (err) {
    res.status(500).send('Something went Wrong!!');
  }
}

async function venueDelete(req, res) {
  try {
    const venue = await Venue.findOne({ 'reviews._id': req.params.id });
    venue.reviews.id(req.params.id).remove();
    await venue.save();
    res.redirect('/venues');
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  artistAdd,
  artistCreate,
  artistEdit,
  artistUpdate,
  artistDelete,
  venueAdd,
  venueCreate,
  venueEdit,
  venueUpdate,
  venueDelete,
};
