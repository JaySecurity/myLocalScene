const express = require('express');
const router = express.Router();

const reviewsCtrl = require('../controllers/reviews');

/* GET users listing. */
router.get('/artists/:id/reviews/new', reviewsCtrl.artistAdd);

router.post('/artists/:id/reviews/', reviewsCtrl.artistCreate);

module.exports = router;
