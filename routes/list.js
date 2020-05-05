var express = require('express');
var router = express.Router();
var hike_controller = require('../controllers/HikeController');
var beach_controller = require('../controllers/BeachController');


//get all hikes
// router.get('/', hike_controller.get_hikes); 
router.get('/', beach_controller.get_beaches);

//creating new hike
// router.post('/', hike_controller.create_hike);
router.post('/', beach_controller.create_beach);

module.exports = router;
