const express = require('express');
const router = express.Router();
const artistsCtrl = require('../controllers/artists');

router.get('/', artistsCtrl.all);
router.get('/add', artistsCtrl.add);
router.get('/:id/edit', artistsCtrl.edit);

router.post('/', artistsCtrl.create);
router.post('/:id', artistsCtrl.update);

module.exports = router;
