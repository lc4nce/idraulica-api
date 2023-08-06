const express = require('express')
const router = express.Router()

const ReviewController = require('../controllers/ReviewController')
const authenticate = require('../middlewares/authenticate')

router.get('/', ReviewController.index)
router.get('/show', ReviewController.show)
router.post('/store', ReviewController.store)
router.post('/update',authenticate, ReviewController.update)
router.post('/destroy', ReviewController.destroy)
router.post('/add-user-review', ReviewController.addUserReview)

module.exports = router