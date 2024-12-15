const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    createTicket,
    getUserTickets,
    getTicketsByEvent,
    getTicketDetails,
    updateTicket,
    deleteTicket,
} = require('../controllers/ticketController');

const router = express.Router();

// Define routes using the protect middleware
router.post('/', protect, createTicket);
router.get('/user', protect, getUserTickets);
router.get('/event/:eventId', protect, getTicketsByEvent);
router.get('/:ticketId', protect, getTicketDetails);
router.put('/:ticketId', protect, updateTicket);
router.delete('/:ticketId', protect, deleteTicket);

module.exports = router;