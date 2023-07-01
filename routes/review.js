const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review');

router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getSingleReview);
router.post('/', reviewController.createReviewInfo);
router.put('/:id', reviewController.updateReviewInfo);
router.delete('/:id', reviewController.deleteReviewInfo);

module.exports = router;