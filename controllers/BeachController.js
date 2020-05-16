// import template for Beaches
const Beach = require('../models/Beach')
const Review = require('../models/Review')
const Location = require('../models/Location')

exports.create_beach = async function (req, res) {
  const beach = new Beach({
    name: req.body.name,
    description: req.body.description,
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
    res.json({ hike: savedBeach, location: savedLoc })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.add_review = async function (req, res) {
  const review = new Review({
    _location: null,
    _user: null,
    description: req.body.description,
    rating: req.body.rating
  })

  try {
    console.log(req)
    const savedReview = await review.save()
    const updatedBeach = await Beach.findOneAndUpdate({ name: req.params.name }, { $push: { _reviews: review._id } })
    res.json({ update: updatedBeach, review: savedReview })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.get_beaches = async function (req, res) {
  try {
    const allBeach = await Beach.find()
    res.json(allBeach)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
