const Hike = require('../models/Hike')
const Location = require('../models/Location')
const Beach = require('../models/Beach')
const Lookout = require('../models/Lookout')
const ObjectId = require('mongoose').Types.ObjectId

exports.get_all_locations = async function (req, res) {
  try {
    const allLocs = await Location.find()
    res.json(allLocs)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.get_all_location_detail = async function (req, res) {
  try {
    await Hike.find()
      .then(hikes => {
        Beach.find()
          .then(beaches => {
            Lookout.find()
              .then(lookouts => {
                res.json(hikes.concat(beaches).concat(lookouts))
              })
          })
      })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

exports.get_location = async function (req, res) {
  const locId = new ObjectId(req.params.id)
  try {
    let detailLoc = await Location.findById(locId)
    const detailId = detailLoc._refId
    switch (detailLoc.type) {
      case 'Hike':
        detailLoc = await Hike.findById(detailId)
        break
      case 'Beach':
        detailLoc = await Beach.findById(detailId)
        break
      case 'Lookout':
        detailLoc = await Lookout.findById(detailId)
        break
      default:
        break
    }
    res.json(detailLoc)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
