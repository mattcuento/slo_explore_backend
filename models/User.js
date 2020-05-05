var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: { 
    type: String ,
    required: true
  },
  username: {
    type : String,
    required: true
  },
  _locationsSeen: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Location'
  }],
  _stats: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Stat'
  }],
  _submittedReviews: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Review'
  }],
  _favorites: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Location'
  }],
  _photosSubmitted: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Photo'
  }],
  time: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', UserSchema);
