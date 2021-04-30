const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  dateTime: Date,
  description: {
    type: String,
    required: false,
  },
  coverCharge: {
    type: String,
    required: true,
  },
  venue: {
    type: Schema.Types.ObjectId,
    ref: 'Venue',
  },
  artists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Artist',
    },
  ],
  poster: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Event', eventSchema);
