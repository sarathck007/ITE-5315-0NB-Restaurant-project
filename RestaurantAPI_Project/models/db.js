const Restaurant = require('./Restaurant');

// Add a new restaurant to database
const addNewRestaurant = async (data) => {
    const restaurant = new Restaurant(data);
    return restaurant.save();
};

// Retrieve a paginated list of restaurants
const getAllRestaurants = async (page, perPage, borough) => {
    const query = borough ? { borough } : {};
    return Restaurant.find(query)
        .sort({ restaurant_id: 1 })
        .skip((page - 1) * perPage)
        .limit(perPage);
};

// Retrieve the restaurant details using ID
const getRestaurantById = async (id) => {
    return Restaurant.findById(id);
};

// Update the restaurant details using ID
const updateRestaurantById = async (id, data) => {
    return Restaurant.findByIdAndUpdate(id, data, { new: true });
};

// Delete the restaurant from database
const deleteRestaurantById = async (id) => {
    return Restaurant.findByIdAndDelete(id);
};


module.exports = {
    addNewRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurantById,
    deleteRestaurantById,
};
