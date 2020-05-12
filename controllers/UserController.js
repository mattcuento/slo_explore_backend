// import template for Users
var User = require('../models/User')

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

exports.get_user = async function (req, res) {
  try {
    const username = req.body.username
    const user = await User.findOne({ username })
    res.json(user)
  } catch (error) {
    res.json({ message: error })
  }
}

/*exports.get_user = async function (req, res) {
  try {
    const username = req.body.username
    const email = req.body.email
    const user = await User.findOne({ username, email})
    res.json(user)
  } catch (error) {
    res.json({ message: error })
  }
}*/

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
    const newUserName = "Omar"
    const updatedUser = await User.findOneAndUpdate({ username: req.body.username }, { $set: {username: newUserName}})
    res.json({ update: updatedUser, username: newUserName})
  } catch (error) {
    res.json({ message: error })
  } 
}