// import template for Beaches
var Beach = require('../models/Beach')
var Review = require('../models/Review')
var Location = require('../models/Location')

exports.create_beach = async function (req, res) {
  const beach = new Beach({
    name: req.body.name,
    description: req.body.description,
    rating: req.body.rating
  })

  try {
    const savedBeach = await beach.save()
    res.json(savedBeach)
  } catch (error) {
    res.json({ message: error })
  }
}

exports.get_beaches_rating = async function (req, res) {
  try {
    const rating = req.params.rating
    const beaches = await Beach.find({ rating }).sort({ rating: -1 })
    res.json(beaches)
  } catch (error) {
    res.json({ message: error })
  }
}

exports.get_beaches_by_name = async function (req, res) {
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

exports.add_review = async function (req, res) {
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
    res.json({ message: error })
  }
}

exports.get_beaches = async function (req, res) {
  try {
    const allBeach = await Beach.find()
    res.json(allBeach)
  } catch (error) {
    res.json({ message: error })
  }
}
