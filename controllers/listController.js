const Hike = require('../models/Hike')
const Location = require('../models/Location')
const Beach = require('../models/Beach')
const Lookout = require('../models/Lookout')
const ObjectId = require('mongoose').Types.ObjectId

exports.getAllLocations = async function (req, res) {
  try {
    const allLocs = await Location.find()
    res.json(allLocs)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.getAllLocationDetail = async function (req, res) {
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

exports.getLocation = async function (req, res) {
  const locId = new ObjectId(req.params.id)
  const type = req.params.type
  try {
    let detailLoc = null
    switch (type) {
      case 'Hike':
        detailLoc = await Hike.findById(locId)
        break
      case 'Beach':
        detailLoc = await Beach.findById(locId)
        break
      case 'Lookout':
        detailLoc = await Lookout.findById(locId)
        break
      default:
        break
    }
    res.json(detailLoc)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
