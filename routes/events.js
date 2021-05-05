const express = require('express');
const router = express.Router();
const eventsCtrl = require('../controllers/events');

router.get('/', eventsCtrl.all);
router.get('/add', eventsCtrl.add);
router.get('/:id/edit', eventsCtrl.edit);
router.get('/:id', eventsCtrl.show);

router.post('/', eventsCtrl.create);
router.put('/:id', eventsCtrl.update);

module.exports = router;
