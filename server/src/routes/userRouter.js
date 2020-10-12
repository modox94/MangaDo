const express = require('express');
const userRegistration = require('../controllers/registration');
const userLogin = require('../controllers/login');

const router = express.Router();

router.post('/registration', userRegistration);
router.post('/login', userLogin);

module.exports = router;
