const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');

/* GET users listing. */
router.get('/register/', usersCtrl.add);
router.get('/login', usersCtrl.getLogin);
router.get('/logout', usersCtrl.logout);

router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);

module.exports = router;
