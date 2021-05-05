const express = require('express');
const router = express.Router();
const venuesCtrl = require('../controllers/venues');

router.get('/', venuesCtrl.all);
router.get('/add', venuesCtrl.add);
router.get('/:id/edit', venuesCtrl.edit);
router.get('/:id/', venuesCtrl.show);

router.post('/', venuesCtrl.create);
router.put('/:id', venuesCtrl.update);

module.exports = router;
