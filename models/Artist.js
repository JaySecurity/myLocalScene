const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = require('./review');

const artistSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Band', 'Comedian', 'Hypnotist', 'Other'],
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  website: String,
  photo: String,
  reviews: [reviewSchema],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Artist', artistSchema);
