import Razorpay from 'razorpay';
import crypto from 'crypto';
import { createOrder, verifyPayment } from '../utils/paymentService.js';

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// Process payment
export const processPayment = async (req, res) => {
    const { event_id, user_id, ticketTier, quantity, price } = req.body;

    try {
        const order = await createOrder(price, 'INR');
        res.status(200).json({ success: true, orderId: order.id });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error processing payment', error });
    }
};

// Handle payment success
export const paymentSuccess = (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.query;

    const isValid = verifyPayment(razorpay_payment_id, razorpay_order_id, razorpay_signature);

    if (isValid) {
        res.status(200).json({ success: true, message: 'Payment successful' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid signature' });
    }
};

// Handle payment failure
export const paymentFailure = (req, res) => {
    res.status(400).json({ success: false, message: 'Payment failed' });
};