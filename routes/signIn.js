var express = require('express')
var router = express.Router()
var userController = require('../controllers/UserController')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send('SIGN IN');
// });

// get single user
router.get('/', userController.getUser)

router.post('/', userController.login)

module.exports = router
