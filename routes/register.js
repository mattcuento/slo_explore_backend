var express = require('express')
var router = express.Router()

var userController = require('../controllers/UserController')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send('NEW ACCOUNT');
// });

// router.get('/', userController.get_all_users)

router.post('/', userController.create_user)

module.exports = router
