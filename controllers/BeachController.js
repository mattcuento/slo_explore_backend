// import template for Beaches
var Beach = require('../models/Beach')
var mongoose = require('mongoose')

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

exports.add_review = async function (req, res) {
  res.send("here")
  try {
    const review = req.body.reviews;
    const updatedBeach = await Beach.findOneAndUpdate({name: req.params.name}, {$push: {_reviews: review}});
    res.json(updatedBeach)
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
