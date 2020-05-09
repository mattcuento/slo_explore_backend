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
    res.json({ message: error })
  }
}

exports.get_location = async function (req, res) {
  const locId = new ObjectId(req.params.id)
  try {
    let detailLoc = await Location.find({ id: { locId } })
    const detailId = detailLoc._refId
    switch (detailLoc.type) {
      case 'hike':
        detailLoc = await Hike.find({ id: { detailId } })
        break
      case 'beach':
        detailLoc = await Beach.find({ id: { detailId } })
        break
      case 'lookout':
        detailLoc = await Lookout.find({ id: { detailId } })
        break
      default:
        break
    }
    res.json(detailLoc)
  } catch (error) {
    res.json({ message: error })
  }
}
