const mongoose = require('mongoose')

const HikeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    default: 'Hike'
  },
  coordinates: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
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
})

module.exports = mongoose.model('Hike', HikeSchema)
