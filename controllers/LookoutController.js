// import template for Lookout
const Lookout = require('../models/Lookout')
const Review = require('../models/Review')
const Location = require('../models/Location')
const Photo = require('../models/Photo')

exports.createLookout = async function (req, res) {
  const lookout = new Lookout({
    name: req.body.name,
    description: req.body.description,
    rating: req.body.rating
  })

  const location = new Location({
    name: lookout.name,
    type: 'Lookout',
    _refId: lookout._id
  })

  try {
    const savedLoc = await location.save()
    const savedLookout = await lookout.save()
    res.json({ lookout: savedLookout, location: savedLoc })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.getLookouts = async function (req, res) {
  try {
    const allLookouts = await Lookout.find()
    res.json(allLookouts)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.getLookoutRating = async function (req, res) {
  try {
    const rating = req.params.rating
    const lookouts = await Lookout.find({ rating }).sort({ rating: -1 })
    res.json(lookouts)
  } catch (error) {
    res.json({ message: error })
  }
}

exports.getLookoutByName = async function (req, res) {
  try {
    const name = req.params.name
    const lookouts = await Lookout.find({
      name: { $regex: name, $options: 'i' }
    }).sort({ name: 1 })
    res.json(lookouts)
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
      const updatedLookout = await Lookout.findOneAndUpdate({ name: req.params.name }, { $push: { _reviews: review._id } })
      res.json({ update: updatedLookout, review: savedReview })
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
      const updatedLookout = await Lookout.findOneAndUpdate({ name: req.params.name }, { $push: { _photos: photo._id } })
      res.json({ update: updatedLookout, photo: savedPhoto })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.addCoordinates = async function (req, res) {
  try {
    const updatedLookout = await Lookout.findOneAndUpdate({ name: req.params.name }, { $set: { coordinates: [req.body.title, req.body.index, req.body.latitude, req.body.longitude] } })
    res.json({ update: updatedLookout })
  } catch (error) {
    res.json({ message: error })
  }
}
