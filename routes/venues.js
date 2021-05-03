const express = require('express');
const router = express.Router();
const venuesCtrl = require('../controllers/venues');

router.get('/', venuesCtrl.all);
router.get('/add', venuesCtrl.add);
router.get('/:id/edit', venuesCtrl.edit);

router.post('/', venuesCtrl.create);
router.post('/:id', venuesCtrl.update);

module.exports = router;
