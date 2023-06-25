const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');



router.use('/', require('./swagger'));
router.use('/product', require('./product'));
router.use('/user', require('./user'));

module.exports = router;