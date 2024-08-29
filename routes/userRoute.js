const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id', userController.getUser);
router.post('/login', userController.login);
router.post('/resetPassword', userController.resetPassword);
router.post('/verifyEmail', userController.verifyEmail);
router.post('/loginwithcode', userController.verifyCodeAndLogin);

module.exports = router;
