const express = require('express');
const router = express.Router();
const venuesCtrl = require('../controllers/venues');

router.get('/', venuesCtrl.all);
router.get('/add', venuesCtrl.add);

router.post('/', venuesCtrl.create);

module.exports = router;
