const express = require('express');
const { registerUser, loginUser, requestPasswordReset, verifyOTPAndResetPassword, retrieveUsername } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/request-password-reset', requestPasswordReset);
router.post('/verify-otp-reset-password', verifyOTPAndResetPassword);
router.post('/retrieve-username', retrieveUsername);

module.exports = router;