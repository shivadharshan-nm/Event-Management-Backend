require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

const PORT = process.env.PORT || 5002;

// Connect to database
connectDB();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});