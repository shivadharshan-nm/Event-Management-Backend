const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getEvents } = require('../controllers/eventController');

const router = express.Router();

router.get('/', protect, getEvents);

module.exports = router;