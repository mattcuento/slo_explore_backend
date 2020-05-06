const mongoose = require('mongoose')

const StatSchema = mongoose.Schema({
  _user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  _hike: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hike'
  },
  timeComplete: {
    type: Date,
    required: true,
    default: Date.now()
  },
  timeStarted: {
    type: Date,
    required: true,
    default: Date.now()
  },
  distance: {
    type: Number,
    required: true,
    default: 0
  },
  elevation: {
    type: Number,
    required: true,
    default: 0
  },
  time: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

module.exports = mongoose.model('Stat', StatSchema)
