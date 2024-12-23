import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
    createEvent, 
    getEvents, 
    getEventById, 
    updateEvent, 
    deleteEvent 
} from '../controllers/eventController.js';

const router = express.Router();

// Route to create a new event
router.post('/', protect, createEvent);

// Route to get all events
router.get('/', getEvents);

// Route to get a specific event by custom ID
router.get('/:id', getEventById);

// Route to update a specific event by ID
router.put('/:id', protect, updateEvent);

// Route to delete a specific event by ID
router.delete('/:id', protect, deleteEvent);

export default router;