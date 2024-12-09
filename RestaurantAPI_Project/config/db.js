const mongoose = require('mongoose');
// Initalize the connection to DB
const initializeDB = async (connectionString) => {
    try {
        // Connect to MongoDB
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully.');
    } catch (err) {
        // Log the connection errors
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
};

module.exports = initializeDB;
