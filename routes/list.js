var express = require('express')
var router = express.Router()
var hikeController = require('../controllers/HikeController')
var beachController = require('../controllers/BeachController')
var listController = require('../controllers/listController')
var lookoutController = require('../controllers/LookoutController')
const multer = require('multer')
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})
const upload = multer({ storage: storage, fileFilter: fileFilter })

// Beach routes
router.get('/beach/all', beachController.getBeaches)

router.get('/beach/name/:name', beachController.getBeachesByName)

router.get('/beach/rating/:rating', beachController.getBeachesRating)

router.put('/beach/review/:name', beachController.addReview)

router.post('/beach/new', beachController.createBeach)

router.post('/beach/:name/photo/add', upload.single('location_photo'), beachController.addPhoto)

// Hike routes
router.get('/hike/all', hikeController.getHikes)

router.put('/hike/review/:name', hikeController.addReview)

router.post('/hike/new', hikeController.createHike)

router.get('/hike/difficulty/:difficulty', hikeController.getHikesDifficulty)

router.get('/hike/rating/:rating', hikeController.getHikesRating)

router.get('/hike/name/:name', hikeController.getHikesByName)

router.post('/hike/:name/photo/add', upload.single('location_photo'), hikeController.addPhoto)

// Lookout routes

router.get('/lookout/all', lookoutController.getLookouts)

router.get('/lookout/name/:name', lookoutController.getLookoutByName)

router.get('/lookout/rating/:rating', lookoutController.getLookoutRating)

router.put('/lookout/review/:name', lookoutController.addReview)

router.post('/lookout/new', lookoutController.createLookout)

router.post('/lookout/:name/photo/add', upload.single('location_photo'), lookoutController.addPhoto)

// List controller routes

router.get('/location/all', listController.getAllLocations)

router.get('/location/all/detail', listController.getAllLocationDetail)

router.get('/location/:id/:type', listController.getLocation)

router.post('/review', listController.getReviews)

// router.get('/hike/photo/all')

// router.delete('/hike/photo/delete')

module.exports = router
