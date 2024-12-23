import express from 'express';
import { processPayment, paymentSuccess, paymentFailure } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to process payment
router.post('/process', protect, processPayment);

// Route to handle payment success
router.get('/success', paymentSuccess);

// Route to handle payment failure
router.get('/failure', paymentFailure);

export default router;