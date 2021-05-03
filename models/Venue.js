const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = require('./review');

const venueSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contact: {
    name: String,
    phone: String,
    email: String,
  },
  website: String,
  photo: String,
  reviews: [reviewSchema],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Venue', venueSchema);
