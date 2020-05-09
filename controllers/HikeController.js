// import template for Hikes
var Hike = require('../models/Hike')
var Location = require('../models/Location')

exports.create_hike = async function (req, res) {
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
    res.json({ message: error })
  }
}

exports.get_hikes = async function (req, res) {
  try {
    const allHikes = await Hike.find()
    res.json(allHikes)
  } catch (error) {
    res.json({ message: error })
  }
}

exports.get_hikes_rating = async function (req, res) {
  try {
    const rating = req.params.rating
    const hikes = await Hike.find({ rating }).sort({ rating: -1 })
    res.json(hikes)
  } catch (error) {
    res.json({ message: error })
  }
}

exports.get_hikes_difficulty = async function (req, res) {
  try {
    const diff = req.params.difficulty
    const hikes = await Hike.find({ difficulty: diff }).sort({
      difficulty: -1
    })
    res.json(hikes)
  } catch (error) {
    res.json({ message: error })
  }
}

exports.get_hikes_by_name = async function (req, res) {
  try {
    const name = req.params.name
    const hikes = await Hike.find({
      name: { $regex: name, $options: 'i' }
    }).sort({ name: 1 })
    res.json(hikes)
  } catch (error) {
    res.json({ message: error })
  }
}
