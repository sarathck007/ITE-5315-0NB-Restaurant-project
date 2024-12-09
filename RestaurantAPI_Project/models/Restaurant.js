const mongoose = require('mongoose');

// Schema of a restaurant
const RestaurantSchema = new mongoose.Schema({
    restaurant_id: String,
    name: String,
    borough: String,
    cuisine: String,
    address: {
        building: String,
        street: String,
        zipcode: String,
        coord: [Number],
    },
    grades: [
        {
            date: Date,
            grade: String,
            score: Number,
        },
    ],
});
// Export the Restaurant model based on the schema
module.exports = mongoose.model('Restaurant', RestaurantSchema);