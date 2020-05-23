var express = require('express')
var router = express.Router()
var userController = require('../controllers/UserController')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

// GET all users
router.get('/all', userController.getAllUsers)

// CREATE new user
router.post('/new', userController.createUser)

// DELETE a user by username
router.delete('/delete/:username', userController.deleteUser)

// GET a user by username
router.get('/one', userController.getUser)

// Change username
router.put('/update/:username', userController.updateUsername)

// Add new favorite location
router.put('/favorites/add/:username', userController.addFavorite)

// Add new location seen, by its name
router.put('/locationsSeen/add/:username', userController.addSeenLocation)

// DELETE a location in favorites, by its name
router.delete('/favorites/delete/:username', userController.deleteFavorite)

router.get('/logout', userController.logout)

module.exports = router
