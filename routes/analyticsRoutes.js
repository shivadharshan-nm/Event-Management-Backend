import express from 'express';
import {
    getAllUsersAnalytics,
    getUserAnalytics,
    getAllEventsAnalytics,
    getEventAnalytics,
    getAllLocationsAnalytics,
    getLocationAnalytics,
    getRecommendedEvents,
    getLoggedInUserAnalytics
} from '../controllers/analyticsController.js';
import { protect } from '../middlewares/authMiddleware.js';
import admin from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/users', protect, admin, getAllUsersAnalytics);
router.get('/users/:userId', protect, admin, getUserAnalytics);
router.get('/events', protect, admin, getAllEventsAnalytics);
router.get('/events/:eventId', protect, admin, getEventAnalytics);
router.get('/locations', protect, admin, getAllLocationsAnalytics);
router.get('/locations/:coordinates', protect, admin, getLocationAnalytics);
router.get('/recommended', protect, getRecommendedEvents);
router.get('/me', protect, getLoggedInUserAnalytics);

export default router;