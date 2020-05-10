const mongoose = require('mongoose')

const PhotoSchema = mongoose.Schema({
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
  photo: {
    type: String
    // handle later
  },
  time: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

module.exports = mongoose.model('Photo', PhotoSchema)
