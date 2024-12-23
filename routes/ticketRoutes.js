import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    createTicket,
    getUserTickets,
    getTicketsByEvent,
    getTicketDetails,
    updateTicket,
    deleteTicket,
} from '../controllers/ticketController.js';

const router = express.Router();

// Define routes using the protect middleware
router.post('/', protect, createTicket);
router.get('/user', protect, getUserTickets);
router.get('/event/:eventId', protect, getTicketsByEvent);
router.get('/:ticketId', protect, getTicketDetails);
router.put('/:ticketId', protect, updateTicket);
router.delete('/:ticketId', protect, deleteTicket);

export default router;