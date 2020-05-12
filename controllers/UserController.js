// import template for Users
var User = require('../models/User')
var Location = require('../models/Location')

exports.create_user = async function (req, res) {
  const user = new User({
    email: req.body.email,
    username: req.body.username
  })
  try {
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (error) {
    res.json({ message: error })
  }
}

exports.delete_user = async function (req, res) {
  try {
    const username = req.params.username
    const deletedUser = await User.findOneAndDelete({ username })
    res.json({deletedUser: deletedUser})
  } catch (error) {
    res.json({ message: error })
  }
}

exports.get_user = async function (req, res) {
  try {
    const username = req.body.username
    const user = await User.findOne({ username })
    res.json(user)
  } catch (error) {
    res.json({ message: error })
  }
}

exports.get_all_users = async function (req, res) {
  try {
    const allUsers = await User.find()
    res.json(allUsers)
  } catch (error) {
    res.json({ message: error })
  }
}

exports.update_username = async function (req, res) {
  try {
    const newUserName = req.body.username
    const updatedUser = await User.findOneAndUpdate({ username: req.params.username }, { $set: {username: newUserName}})
    res.json({ update: updatedUser, username: newUserName})
  } catch (error) {
    res.json({ message: error })
  } 
}

// add new favorite
exports.add_favorite = async function (req, res) {
  const location = new Location({
    name: req.body.name,
    type: req.body.type,
    //_refId: 77,
  })

  try {
    const savedLocation = await location.save()
    const updatedFavorite = await User.findOneAndUpdate({ username: req.params.username }, { $push: {_favorites : location._id}})
    res.json({ update: updatedFavorite, location: savedLocation })
  } catch (error) {
    res.json({ message: error })
  } 
}

// get favorite
exports.get_favorite = async function (req, res) {
  try {
    const username = req.params.username
    const locationName = req.body.name
    const location = await User.findOne({username}).findOne({_favorites: locationName})
    res.json({ locationName : location})
  } catch (error) {
    res.json({ message: error })
  } 
}

// remove favorite
/*exports.delete_favorite = async function (req, res) {
  try {
    const 
    res.json({ })
  } catch (error) {
    res.json({ message: error })
  } 
}*/
