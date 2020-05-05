var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/UserController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//get all users
router.get('/:username/:email', user_contoller.get_all_users);

module.exports = router;
