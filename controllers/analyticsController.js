const User = require('../models/User');
const Event = require('../models/Event');

// Get analytics for all users (admin only)
exports.getAllUsersAnalytics = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get analytics for a specific user (admin only)
exports.getUserAnalytics = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get analytics for all events (admin only)
exports.getAllEventsAnalytics = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get analytics for a specific event (admin only)
exports.getEventAnalytics = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get analytics for all locations (admin only)
exports.getAllLocationsAnalytics = async (req, res) => {
    try {
        const locations = await Event.distinct('location');
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get analytics for a specific location (admin only)
exports.getLocationAnalytics = async (req, res) => {
    try {
        const coordinates = req.params.coordinates.split(',');
        const longitude = parseFloat(coordinates[0]);
        const latitude = parseFloat(coordinates[1]);

        console.log(`Longitude: ${longitude}, Latitude: ${latitude}`);

        const events = await Event.find({
            'location.coordinates': {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000 // 10 km radius
                }
            }
        });

        res.status(200).json(events);
    } catch (error) {
        console.error('Error in getLocationAnalytics:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get recommended events for a user (user only)
exports.getRecommendedEvents = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Simple recommendation logic based on user's past events
        const pastEvents = await Event.find({ _id: { $in: user.pastEvents } });
        const categories = pastEvents.map(event => event.category);
        const recommendedEvents = await Event.find({ category: { $in: categories } }).limit(10);

        res.status(200).json(recommendedEvents);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get analytics for the logged-in user (user only)
exports.getLoggedInUserAnalytics = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};