const mongoose = require('mongoose');

const BeachSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    default: "Beach"
  },
  coordinates: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tide: {
    type: Number,
    required: true,
    default: 0
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  _reviews: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Review',
    required: false
  }],
  _photos: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Photo',
    required: false
  }],
  time: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = mongoose.model('Beach', BeachSchema);
