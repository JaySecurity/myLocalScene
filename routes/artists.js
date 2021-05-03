const express = require('express');
const router = express.Router();
const artistsCtrl = require('../controllers/artists');

router.get('/', artistsCtrl.all);
router.get('/add', artistsCtrl.add);

router.post('/', artistsCtrl.create);

module.exports = router;
