const mongoose = require('mongoose')

const LocationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  _refId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

module.exports = mongoose.model('Location', LocationSchema)
