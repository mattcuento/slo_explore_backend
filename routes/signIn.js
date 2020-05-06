var express = require('express')
var router = express.Router()
var user_controller = require('../controllers/UserController')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send('SIGN IN');
// });

// get single user
router.get('/', user_controller.get_user)

module.exports = router
