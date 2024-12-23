import Ticket from '../models/Ticket.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import { sendEmail } from '../utils/emailService.js';
import { processPayment } from '../utils/paymentService.js';
import QRCode from 'qrcode';
import mongoose from 'mongoose';

// Create a new ticket
export const createTicket = async (req, res) => {
    const { event, quantity, ticketTier, paymentDetails } = req.body;
    try {
        const eventDetails = await Event.findById(event);
        if (!eventDetails) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const availableTier = eventDetails.ticketPricing.find(t => t.tier === ticketTier);
        if (!availableTier) {
            return res.status(400).json({ message: 'Invalid ticket tier for this event' });
        }

        const price = availableTier.price * quantity;

        // Process payment
        // const paymentResult = await processPayment(paymentDetails, price);
        // if (!paymentResult.success) {
        //     return res.status(400).json({ message: 'Payment failed' });
        // }

        const ticket = new Ticket({
            price,
            event,
            quantity,
            ticketTier,
            user: req.user.id // Set the user field to the authenticated user's ID
        });

        // Save the ticket to the database
        await ticket.save();

        // Generate QR code
        const qrCodeData = await QRCode.toDataURL(`Ticket ID: ${ticket._id}`);

        // Send email with ticket details and QR code
        const user = await User.findById(req.user.id);
        const emailContent = `
            <h1>Ticket Confirmation</h1>
            <p>Thank you for purchasing a ticket for the event: ${eventDetails.name}</p>
            <p>Ticket Tier: ${ticketTier}</p>
            <p>Quantity: ${quantity}</p>
            <p>Price: $${price}</p>
            <img src="${qrCodeData}" alt="QR Code" />
        `;
        await sendEmail(user.email, 'Ticket Confirmation', emailContent);

        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get tickets by event ID
export const getTicketsByEvent = async (req, res) => {
    try {
        const tickets = await Ticket.find({ event: req.params.eventId });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get ticket details by ticket ID
export const getTicketDetails = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update ticket by ticket ID
export const updateTicket = async (req, res) => {
    const { quantity, ticketTier } = req.body;
    try {
        const ticket = await Ticket.findById(req.params.ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        ticket.quantity = quantity || ticket.quantity;
        ticket.ticketTier = ticketTier || ticket.ticketTier;

        // Fetch the price from the event's ticket pricing based on the selected tier
        const eventDetails = await Event.findById(ticket.event);
        const availableTier = eventDetails.ticketPricing.find(t => t.tier === ticket.ticketTier);
        ticket.price = availableTier.price;

        await ticket.save();

        // Send email notification for ticket update
        const user = await User.findById(ticket.user);
        const emailContent = `
            <h1>Ticket Update</h1>
            <p>Your ticket for the event: ${eventDetails.name} has been updated.</p>
            <p>Ticket Tier: ${ticket.ticketTier}</p>
            <p>Quantity: ${ticket.quantity}</p>
            <p>Price: $${ticket.price}</p>
        `;
        await sendEmail(user.email, 'Ticket Update', emailContent);

        res.status(200).json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete ticket by ticket ID
export const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        await ticket.remove();

        // Send email notification for ticket cancellation
        const user = await User.findById(ticket.user);
        const emailContent = `
            <h1>Ticket Cancellation</h1>
            <p>Your ticket for the event: ${ticket.event.name} has been cancelled.</p>
            <p>Ticket Tier: ${ticket.ticketTier}</p>
            <p>Quantity: ${ticket.quantity}</p>
            <p>Price: $${ticket.price}</p>
        `;
        await sendEmail(user.email, 'Ticket Cancellation', emailContent);

        res.status(200).json({ message: 'Ticket removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cancel a ticket
export const cancelTicket = async (req, res) => {
    try {
        const { ticketId } = req.body;

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        await ticket.remove();
        res.status(200).json({ message: 'Ticket canceled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling ticket', error });
    }
};

// Get all tickets for a user
export const getUserTickets = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const tickets = await Ticket.find({ user: userId })
            .populate('event')
            .populate('ticketTier')
            .exec();

        res.status(200).json(tickets);
    } catch (error) {
        console.error('Ticket fetch error:', error);
        res.status(500).json({ message: error.message });
    }
};