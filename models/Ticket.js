import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    purchasedAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ticketTier: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;