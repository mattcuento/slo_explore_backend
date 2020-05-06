const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
  _location: {
    type: mongoose.Schema.ObjectId,
    ref: 'Location',
    required: true
  },
  _user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  _photos: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Photo'
  }],
  time: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

module.exports = mongoose.model('Review', ReviewSchema)
