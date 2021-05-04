const express = require('express');
const router = express.Router();

const reviewsCtrl = require('../controllers/reviews');

/* GET users listing. */
router.get('/artists/:id/reviews/new', reviewsCtrl.artistAdd);
router.get('/artists/reviews/:id/edit', reviewsCtrl.artistEdit);

router.post('/artists/:id/reviews/', reviewsCtrl.artistCreate);
router.put('/artists/:aId/reviews/:rId', reviewsCtrl.artistUpdate);

module.exports = router;
