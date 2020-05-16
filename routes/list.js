var express = require('express')
var router = express.Router()
var hikeController = require('../controllers/HikeController')
var beachController = require('../controllers/BeachController')
var listController = require('../controllers/listController')
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

// get all hikes
router.get('/hike/all', hikeController.get_hikes)

router.get('/beach/all', beachController.get_beaches)

router.get('/location/all', listController.get_all_locations)

router.get('/location/all/detail', listController.get_all_location_detail)

router.put('/beach/review/:name', beachController.add_review)

router.put('/hike/review/:name', hikeController.add_review)
// creating new hike
router.post('/hike/new', hikeController.create_hike)

router.post('/beach/new', beachController.create_beach)

router.get('/hike/difficulty/:difficulty', hikeController.get_hikes_difficulty)

router.get('/hike/rating/:rating', hikeController.get_hikes_rating)

router.get('/hike/name/:name', hikeController.get_hikes_by_name)

router.get('/location/:id', listController.get_location)

router.post('/hike/:name/photo/add', upload.single('location_photo'), hikeController.add_photo)

// router.get('/hike/photo/all')

// router.delete('/hike/photo/delete')

module.exports = router
