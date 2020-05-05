var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/UserController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send('NEW ACCOUNT');
// });

router.get('/', user_controller.get_all_users);

router.post('/', user_controller.create_user);



module.exports = router;

