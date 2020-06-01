// import template for Hikes
var Hike = require('../models/Hike')
var Location = require('../models/Location')
var Review = require('../models/Review')
const Photo = require('../models/Photo')

exports.createHike = async function (req, res) {
  const hike = new Hike({
    name: req.body.name,
    description: req.body.description,
    difficulty: req.body.difficulty,
    rating: req.body.rating
  })

  const location = new Location({
    name: hike.name,
    type: 'Hike',
    _refId: hike._id
  })
  try {
    const savedHike = await hike.save()
    const savedLoc = await location.save()
    res.json({ hike: savedHike, location: savedLoc })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.getHikes = async function (req, res) {
  try {
    const allHikes = await Hike.find()
    res.json(allHikes)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.getHikesRating = async function (req, res) {
  try {
    const rating = req.params.rating
    const hikes = await Hike.find({ rating }).sort({ rating: -1 })
    res.json(hikes)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.getHikesDifficulty = async function (req, res) {
  try {
    const diff = req.params.difficulty
    const hikes = await Hike.find({ difficulty: diff }).sort({
      difficulty: -1
    })
    res.json(hikes)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.getHikesByName = async function (req, res) {
  try {
    const name = req.params.name
    const hikes = await Hike.find({
      name: { $regex: name, $options: 'i' }
    }).sort({ name: 1 })
    res.json(hikes)
  } catch (error) {
    res.status(500).json({ message: error })
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
      const updatedHike = await Hike.findOneAndUpdate({ name: req.params.name }, { $push: { _reviews: review._id } })
      res.json({ update: updatedHike, review: savedReview })
    } catch (error) {
      res.status(500).json({ message: error })
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
      await Hike.findOneAndUpdate({ name: req.params.name }, { $push: { _photos: photo._id } })
        .then(result => res.json({ update: result, photo: savedPhoto }))
        .catch(err => res.status(500).json({ message: err }))
    } catch (error) {
      res.status(500).json({ message: error })
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.addCoordinates = async function (req, res) {
  try {
    const updatedHike = await Hike.findOneAndUpdate({ name: req.params.name }, { $set: { coordinates: [req.body.title, req.body.index, req.body.latitude, req.body.longitude] } })
    res.json({ update: updatedHike })
  } catch (error) {
    res.json({ message: error })
  }
}
