const express = require('express');
const router = express.Router();

const reviewsCtrl = require('../controllers/reviews');

/* Artist Routes */
router.get('/artists/:id/reviews/new', reviewsCtrl.artistAdd);
router.get('/artists/reviews/:id/edit', reviewsCtrl.artistEdit);

router.post('/artists/:id/reviews/', reviewsCtrl.artistCreate);

router.put('/artists/:aId/reviews/:rId', reviewsCtrl.artistUpdate);

router.delete('/artists/reviews/:id', reviewsCtrl.artistDelete);

// Venue Routes
router.get('/venues/:id/reviews/new', reviewsCtrl.venueAdd);
router.get('/venues/reviews/:id/edit', reviewsCtrl.venueEdit);

router.post('/venues/:id/reviews/', reviewsCtrl.venueCreate);

router.put('/venues/:vId/reviews/:rId', reviewsCtrl.venueUpdate);

router.delete('/venues/reviews/:id', reviewsCtrl.venueDelete);

module.exports = router;
