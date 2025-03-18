const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../middlewares/authmiddlewares');
const { verifyOtp } = require('../utilities/otpUtilities');

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/verifyotp', protect, verifyOtp); // Fixed middleware reference
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);

router.get('/user/:id', userController.getUser);
router.get('/users', protect, restrictTo(2), userController.getUsers);

module.exports = router;
