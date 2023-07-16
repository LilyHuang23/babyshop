const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');


router.use('/', require('./swagger'));

router.use('/product', require('./product'));

router.use('/user', require('./user'));

router.use('/review', require('./review'));

router.use('/cart', require('./cart'));
module.exports = router;