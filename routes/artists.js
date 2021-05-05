const express = require('express');
const router = express.Router();
const artistsCtrl = require('../controllers/artists');

router.get('/', artistsCtrl.all);
router.get('/add', artistsCtrl.add);
router.get('/:id/edit', artistsCtrl.edit);
router.get('/:id', artistsCtrl.show);

router.post('/', artistsCtrl.create);
router.put('/:id', artistsCtrl.update);
router.delete('/:id', artistsCtrl.delete);

module.exports = router;
