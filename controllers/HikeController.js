//import template for Hikes
var Hike = require('../models/Hike');
var mongoose = require('mongoose');

exports.create_hike = async function(req, res) {
  const hike = new Hike({
    name: req.body.name,
    description: req.body.description,
    difficulty: req.body.difficulty,
    rating: req.body.rating
  });
  
  try {
    const savedHike = await hike.save();
    res.json(savedHike);
  } catch(error) {
    res.json({message: error});
  }
}

exports.get_hikes = async function(req, res) {
  try {
    const allHikes = await Hike.find();
    res.json(allHikes);
  } catch(error) {
    res.json({message: error});
  }
}

