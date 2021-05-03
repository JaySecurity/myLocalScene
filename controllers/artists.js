const Artist = require('../models/Artist');

async function all(req, res) {
  const artists = await Artist.find({});
  res.render('artists/index', { title: 'Artists', artists });
}

function add(req, res) {
  if (req.session.user) {
    res.render('artists/add', { title: 'Add Artist' });
  } else {
    res.redirect('/');
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

module.exports = { all, add, create };
