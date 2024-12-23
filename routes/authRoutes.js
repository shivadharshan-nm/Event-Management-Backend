import express from 'express';
import { registerUser, loginUser, requestPasswordReset, verifyOTPAndResetPassword, retrieveUsername } from '../controllers/authController.js';

const router = express.Router();

// Define auth routes
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/request-password-reset', requestPasswordReset);
router.post('/verify-otp-reset-password', verifyOTPAndResetPassword);
router.post('/retrieve-username', retrieveUsername);

export default router;