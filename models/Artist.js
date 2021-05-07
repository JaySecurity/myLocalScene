const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Event = require('./Event');

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

artistSchema.pre('remove', async function (next) {
  console.log(this);
  await Event.updateMany(
    { artists: this._id },
    { $pull: { artists: this._id } },
    { multi: true }
  ).exec();
  next();
});

module.exports = mongoose.model('Artist', artistSchema);
