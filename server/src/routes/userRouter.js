const express = require('express');
const userRegistration = require('../controllers/registration');

const router = express.Router();

router.post('/registration', userRegistration);

module.exports = router;
