var express = require('express')
var router = express.Router()
var userController = require('../controllers/UserController')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

// GET all users
router.get('/all', userController.get_all_users)

// create new user
router.post('/new', userController.create_user)

// delete a user - testing purposes

// get user by username and email
//router.get('/:username/:email', userController.get_user)

// get user by username
// *NOTE* Might need to check for duplicate users
router.get('/:username', userController.get_user)

// update username
router.put('/update', userController.update_username)

module.exports = router
