const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');



router.use('/', requiresAuth(), require('./swagger'));
router.use('/airbnb',  requiresAuth(), require('./airbnb'));
router.use('/user', requiresAuth(), require('./user'));

module.exports = router;