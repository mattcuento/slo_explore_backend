var express = require('express')
var router = express.Router()
var userController = require('../controllers/UserController')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

// GET all users
router.get('/all', userController.get_all_users)

// CREATE new user
router.post('/new', userController.create_user)

// DELETE a user by username
router.delete('/delete/:username', userController.delete_user)

// GET a user by username
router.get('/:username', userController.get_user)

// Change username
router.put('/update/:username', userController.update_username)

// Add new favorite location
router.put('/favorites/add/:username', userController.add_favorite)

// Add new location seen, by its name
router.put('/locationsSeen/add/:username', userController.add_seen_location)

// DELETE a location in favorites, by its name
router.delete('/favorites/delete/:username', userController.delete_favorite)

module.exports = router
