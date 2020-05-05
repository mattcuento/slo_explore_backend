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

router.get('/difficulty/:difficulty', hike_controller.get_hikes_difficulty);

router.get('/rating/:rating', hike_controller.get_hikes_rating);

router.get('/name/:name', hike_controller.get_hikes_by_name);


module.exports = router;
