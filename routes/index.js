const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');






router.use('/', requiresAuth(), require('./swagger'));

router.use('/product',requiresAuth(), require('./product'));

router.use('/user',requiresAuth(), require('./user'));

router.use('/review',requiresAuth(), require('./review'));

router.use('/cart',requiresAuth(), require('./cart'));
module.exports = router;