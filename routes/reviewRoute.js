const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getReviews);
router.get('/new', reviewController.getNewestReviews);
router.post('/create', reviewController.createReview);

module.exports = router;
