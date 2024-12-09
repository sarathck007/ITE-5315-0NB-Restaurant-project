const express = require('express');
const db = require('../models/db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// POST /api/restaurants
// Protected route to add a new restaurant
router.post('/', authenticateToken, async (req, res) => {
    try {
        const restaurant = await db.addNewRestaurant(req.body);
        res.status(201).json(restaurant);
    } catch (err) {
        res.status(500).json({ error: 'Unable to add restaurant.' });
    }
});

// GET /api/restaurants
// Public route to fetch restaurants
router.get('/', async (req, res) => {
    const { page = 1, perPage = 10, borough } = req.query;

    // Validate query parameters
    if (!Number.isInteger(+page) || +page <= 0) {
        return res.status(400).json({ error: 'Page must be a positive integer.' });
    }

    if (!Number.isInteger(+perPage) || +perPage <= 0) {
        return res.status(400).json({ error: 'PerPage must be a positive integer.' });
    }

    if (borough && typeof borough !== 'string') {
        return res.status(400).json({ error: 'Borough must be a string.' });
    }

    try {
        const restaurants = await db.getAllRestaurants(+page, +perPage, borough);
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch restaurants.' });
    }
});

// GET /api/restaurants/:id
// Public route to fetch a restaurant by ID
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await db.getRestaurantById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found.' });
        }
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch restaurant.' });
    }
});

// PUT /api/restaurants/:id
// Protected route to update a restaurant by ID
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedRestaurant = await db.updateRestaurantById(req.params.id, req.body);
        if (!updatedRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found.' });
        }
        res.json(updatedRestaurant);
    } catch (err) {
        res.status(500).json({ error: 'Unable to update restaurant.' });
    }
});

// DELETE /api/restaurants/:id
// Protected route to delete a restaurant by ID
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const deletedRestaurant = await db.deleteRestaurantById(req.params.id);
        if (!deletedRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found.' });
        }
        res.status(200).json({ message: 'Restaurant deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Unable to delete restaurant.' });
    }
});

module.exports = router;
