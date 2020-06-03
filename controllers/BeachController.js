// import template for Beaches
const Beach = require('../models/Beach')
const Review = require('../models/Review')
const Location = require('../models/Location')
const Photo = require('../models/Photo')

exports.createBeach = async function (req, res) {
  const beach = new Beach({
    name: req.body.name,
    description: req.body.description,
    coordinates: req.body.coordinates,
    rating: req.body.rating
  })

  const location = new Location({
    name: beach.name,
    type: 'Beach',
    _refId: beach._id
  })

  try {
    const savedLoc = await location.save()
    const savedBeach = await beach.save()
    res.json({ beach: savedBeach, location: savedLoc })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
exports.getBeaches = async function (req, res) {
  try {
    const allBeach = await Beach.find()
    res.json(allBeach)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.getBeachesRating = async function (req, res) {
  try {
    const rating = req.params.rating
    const beaches = await Beach.find({ rating }).sort({ rating: -1 })
    res.json(beaches)
  } catch (error) {
    res.json({ message: error })
  }
}

exports.getBeachesByName = async function (req, res) {
  try {
    const name = req.params.name
    const beaches = await Beach.find({
      name: { $regex: name, $options: 'i' }
    }).sort({ name: 1 })
    res.json(beaches)
  } catch (error) {
    res.json({ message: error })
  }
}

exports.addReview = async function (req, res) {
  try {
    const location = await Location.findOne({ name: req.params.name })
    const review = new Review({
      _location: location._id,
      _user: null,
      description: req.body.description,
      rating: req.body.rating
    })

    try {
      const savedReview = await review.save()
      const updatedBeach = await Beach.findOneAndUpdate({ name: req.params.name }, { $push: { _reviews: review._id } })
      res.json({ update: updatedBeach, review: savedReview })
    } catch (error) {
      res.json({ message: error })
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.addPhoto = async function (req, res) {
  try {
    const location = await Location.findOne({ name: req.params.name })
    const photo = new Photo({
      _location: location._id,
      _user: null,
      photo: req.file.path
    })
    try {
      const savedPhoto = await photo.save()
      const updatedBeach = await Beach.findOneAndUpdate({ name: req.params.name }, { $push: { _photos: photo.photo } })
      res.json({ update: updatedBeach, photo: savedPhoto })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.addCoordinates = async function (req, res) {
  try {
    const updatedBeach = await Beach.findOneAndUpdate({ name: req.params.name }, { $set: { coordinates: [req.body.title, req.body.index, req.body.latitude, req.body.longitude] } })
    res.json({ update: updatedBeach })
  } catch (error) {
    res.json({ message: error })
  }
}
