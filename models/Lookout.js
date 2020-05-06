const mongoose = require('mongoose')

const LookoutSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  coordinates: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  sunrise: {
    type: Date
  },
  sunset: {
    type: Date
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
})

module.exports = mongoose.model('Lookout', LookoutSchema)
