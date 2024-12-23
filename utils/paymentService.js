import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

const createOrder = async (amount, currency) => {
    try {
        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency,
            receipt: `receipt_order_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        return order;
    } catch (error) {
        throw new Error(error.message);
    }
};

const verifyPayment = (paymentId, orderId, signature) => {
    const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(orderId + '|' + paymentId)
        .digest('hex');

    return generatedSignature === signature;
};

const processPayment = async (paymentDetails) => {
    try {
        const options = {
            amount: paymentDetails.amount * 100, // amount in the smallest currency unit
            currency: paymentDetails.currency,
            receipt: `receipt_order_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        return { success: true, order };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export { createOrder, verifyPayment, processPayment };