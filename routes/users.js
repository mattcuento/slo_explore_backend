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

// delete a user by username
router.delete('/delete/:username', userController.delete_user)

// get user by username
router.get('/:username', userController.get_user)

// update username
router.put('/update/:username', userController.update_username)

// add new favorite
router.put('/favorites/add/:username', userController.add_favorite)

// get favorite location
router.get('/favorites/get/:username', userController.get_favorite)

module.exports = router
