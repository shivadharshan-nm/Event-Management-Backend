import Event from '../models/Event.js';

// Create a new event
export const createEvent = async (req, res) => {
    const { name, description, date, time, location, category, media, ticketPricing, availableTiers } = req.body;
    try {
        const event = new Event({
            name,
            description,
            date,
            time,
            location,
            category,
            media,
            ticketPricing,
            availableTiers,
            createdBy: req.user.id // Set the createdBy field to the authenticated user's ID
        });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all events
export const getEvents = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    { 'location.coordinates': { $regex: search, $options: 'i' } }
                ]
            };
        }

        const events = await Event.find(query);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};

// Get event by custom ID
export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        // Convert id to integer
        const customId = parseInt(id, 10);

        // Check if the conversion was successful
        if (isNaN(customId)) {
            return res.status(400).json({ message: 'Invalid event ID format' });
        }

        const event = await Event.findOne({ id: customId });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update event by custom ID
export const updateEvent = async (req, res) => {
    const { name, description, date, time, location, category, media, ticketPricing } = req.body;
    try {
        const { id } = req.params;

        // Convert id to integer
        const customId = parseInt(id, 10);

        // Check if the conversion was successful
        if (isNaN(customId)) {
            return res.status(400).json({ message: 'Invalid event ID format' });
        }

        const event = await Event.findOne({ id: customId });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        event.name = name || event.name;
        event.description = description || event.description;
        event.date = date || event.date;
        event.time = time || event.time;
        event.location = location || event.location;
        event.category = category || event.category;
        event.media = media || event.media;
        event.ticketPricing = ticketPricing || event.ticketPricing;

        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete event by custom ID
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        // Convert id to integer
        const customId = parseInt(id, 10);

        // Check if the conversion was successful
        if (isNaN(customId)) {
            return res.status(400).json({ message: 'Invalid event ID format' });
        }

        const event = await Event.findOneAndDelete({ id: customId });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};