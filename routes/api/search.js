const express = require('express');
const router = express.Router();
const searchCtrl = require('../../controllers/api/search');

router.get('/search/venues', searchCtrl.venues);
router.get('/search/artists', searchCtrl.artists);
router.get('/search/events', searchCtrl.events);

module.exports = router;
