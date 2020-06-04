// import template for Users
var User = require('../models/User')
var Location = require('../models/Location')
const bcrypt = require('bcrypt')
const passport = require('passport')

exports.createUser = async function (req, res) {
  const { name, email, password, password2 } = req.body
  const errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' })
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' })
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' })
  }

  if (errors.length > 0) {
    res.json(errors)
  } else {
    const user = new User({
      email,
      name,
      password
    })

    // eslint-disable-next-line handle-callback-err
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(user.password, salt, async (err, hash) => {
        if (err) {
          res.status(500).json({ message: err })
        } else {
          user.password = hash
          try {
            await user.save()
              .then(savedUser => {
                res.json({ user: savedUser })
              })
          } catch (error) {
            res.status(500).json({ message: error })
          }
        }
      }))
  }
}

// get a single user by username
exports.getUser = async function (req, res) {
  try {
    const username = req.params.name
    const user = await User.findOne({ name: username })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.getAllUsers = async function (req, res) {
  try {
    const allUsers = await User.find()
    res.json(allUsers)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.logout = function (req, res) {
  req.logout()
  return true
}

exports.updateUsername = async function (req, res) {
  try {
    const newUserName = req.body.name
    const updatedUser = await User.findOneAndUpdate({ name: req.params.name }, { $set: { name: newUserName } })
    res.json({ update: updatedUser, name: newUserName })
  } catch (error) {
    res.json({ message: error })
  }
}

// add new favorite by its name
exports.addFavorite = async function (req, res) {
  try {
    const location = await Location.findOne({ name: req.body.name })
    const updatedFavorite = await User.findOneAndUpdate({ name: req.params.name }, { $addToSet: { _favorites: location._id } })
    res.json({ update: updatedFavorite, location: location })
  } catch (error) {
    res.json({ message: error })
  }
}

// add new seen location by its name
exports.addSeenLocation = async function (req, res) {
  try {
    const location = await Location.findOne({ name: req.body.name })
    const updatedFavorite = await User.findOneAndUpdate({ name: req.params.name }, { $addToSet: { _locationsSeen: location._id } })
    res.json({ update: updatedFavorite, location: location })
  } catch (error) {
    res.json({ message: error })
  }
}

// delete a location in favorites by its name
exports.deleteFavorite = async function (req, res) {
  try {
    const location = await Location.findOne({ name: req.body.name })
    const user = await User.findOneAndUpdate({ name: req.params.name }, { $pull: { _favorites: location._id } })
    res.json({ user: user, location: location })
  } catch (error) {
    res.json({ message: error })
  }
}

// delete a user by username
exports.deleteUser = async function (req, res) {
  try {
    const username = req.params.name
    const deletedUser = await User.findOneAndDelete({ username })
    res.json({ deletedUser: deletedUser })
  } catch (error) {
    res.json({ message: error })
  }
}
