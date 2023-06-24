const express = require('express');
const router = express.Router();

const airbnbController = require('../controllers/airbnb');

router.get('/', airbnbController.getAll);
router.get('/:id', airbnbController.getSingle);

router.post('/', airbnbController.createInfo);
router.put('/:id', airbnbController.updateInfo);
router.delete('/:id', airbnbController.deleteInfo);

module.exports = router;
