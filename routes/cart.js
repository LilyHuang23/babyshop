const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart');

router.get('/', cartController.getAllCarts);
router.get('/:id', cartController.getSingleCart);
router.post('/', cartController.createCartInfo);
router.put('/:id', cartController.updateCartInfo);
router.delete('/:id', cartController.deleteCartInfo);

module.exports = router;