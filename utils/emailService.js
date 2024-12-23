import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASS,
    },
});

const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: process.env.EMAIL_SERVICE_USER,
        to,
        subject,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export { sendEmail };