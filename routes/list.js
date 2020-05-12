var express = require('express')
var router = express.Router()
var hikeController = require('../controllers/HikeController')
var beachController = require('../controllers/BeachController')
var listController = require('../controllers/listController')

// get all hikes
router.get('/hike/all', hikeController.get_hikes)

router.get('/beach/all', beachController.get_beaches)

router.get('/beach/name/:name', beachController.get_beaches_by_name)

router.get('/beach/rating/:rating', beachController.get_beaches_rating)

router.get('/location/all', listController.get_all_locations)

router.put('/beach/review/:name', beachController.add_review)
router.put('/hike/review/:name', hikeController.add_review)
// creating new hike
router.post('/hike/new', hikeController.create_hike)

router.post('/beach/new', beachController.create_beach)

router.get('/hike/difficulty/:difficulty', hikeController.get_hikes_difficulty)

router.get('/hike/rating/:rating', hikeController.get_hikes_rating)

router.get('/hike/name/:name', hikeController.get_hikes_by_name)

router.get('/location/:id', listController.get_location)

module.exports = router
