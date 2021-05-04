const express = require('express');
const router = express.Router();
const eventsCtrl = require('../controllers/events');

router.get('/', eventsCtrl.all);
router.get('/add', eventsCtrl.add);
// router.get('/:id/edit', artistsCtrl.edit);

router.post('/', eventsCtrl.create);
// router.put('/:id', artistsCtrl.update);

module.exports = router;
