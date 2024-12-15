const express = require('express');
const
 {
    getAllUsersAnalytics,
    getUserAnalytics,
    getAllEventsAnalytics,
    getEventAnalytics,
    getAllLocationsAnalytics,
    getLocationAnalytics,
    getRecommendedEvents,
    getLoggedInUserAnalytics
} = require('../controllers/analyticsController');
const { protect } = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/users', protect, admin, getAllUsersAnalytics);
router.get('/users/:userId', protect, admin, getUserAnalytics);
router.get('/events', protect, admin, getAllEventsAnalytics);
router.get('/events/:eventId', protect, admin, getEventAnalytics);
router.get('/locations', protect, admin, getAllLocationsAnalytics);
router.get('/locations/:coordinates', protect, admin, getLocationAnalytics);
router.get('/recommended', protect, getRecommendedEvents);
router.get('/me', protect, getLoggedInUserAnalytics);

module.exports = router;