const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getSingleUser);
router.post('/', userController.createUserInfo);
router.put('/:id', userController.updateUserInfo);
router.delete('/:id', userController.deleteUserInfo);

module.exports = router;