import twilio from 'twilio';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } from '../config/keys';

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSMS = (to, message) => {
    return client.messages.create({
        body: message,
        from: TWILIO_PHONE_NUMBER,
        to: to
    });
};

export { sendSMS };