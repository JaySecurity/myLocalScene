const Artist = require('../models/Artist');
const Event = require('../models/Event');

async function all(req, res) {
  const artists = await Artist.find({})
    .populate('reviews.createdBy', 'username')
    .exec();
  res.render('artists/index', { title: 'Artists', artists });
}

function add(req, res) {
  if (req.session.user) {
    res.render('artists/add', { title: 'Add Artist' });
  } else {
    res.redirect('/');
  }
}

async function show(req, res) {
  try {
    const artist = await Artist.findById(req.params.id);
    res.render('artists/show', { title: 'Artist View', artist });
  } catch (err) {
    res.status(500).send('Something went Wrong!');
  }
}

async function create(req, res) {
  try {
    const newArtist = await new Artist(req.body);
    newArtist.createdBy = req.session.user;
    await newArtist.save();
    res.redirect('/artists');
  } catch (err) {
    res.status(500).send('Something went Wrong...');
  }
}

async function edit(req, res) {
  const artist = await Artist.findById(req.params.id);
  if (!artist) {
    req.session.message = 'Artist Not Found';
    res.render('artists/edit', { title: 'Edit Artist' });
    req.session.message = '';
  } else {
    res.render('artists/edit', { title: 'Edit Artist', artist });
  }
}

async function update(req, res) {
  try {
    await Artist.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/artists');
  } catch (err) {
    res.status(500).send('Something Went Wrong');
  }
}

async function deleteOne(req, res) {
  try {
    await Event.updateMany(
      { artists: req.params.id },
      { $pull: { artists: req.params.id } }
    );
    await Artist.findByIdAndDelete(req.params.id);
    res.redirect('/artists');
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { all, add, create, edit, update, show, delete: deleteOne };
