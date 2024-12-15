const mongoose = require('mongoose');
const keys = require('../config/keys');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(keys.mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;