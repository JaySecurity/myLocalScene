const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Event = require('./Event');

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

// venueSchema.pre('remove', async (next) => {
//   await Event.deleteMany({ venue: this._id });
//   next();
// });

module.exports = mongoose.model('Venue', venueSchema);
