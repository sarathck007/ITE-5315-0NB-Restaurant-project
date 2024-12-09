const express = require('express');
const db = require('../models/db');
const router = express.Router();

// Render the form
router.get('/', (req, res) => {
    res.render('form', { restaurants: null, error: null });
});

// Handle form submission
router.post('/search', async (req, res) => {
    const { page, perPage, borough } = req.body;

    // Validate form inputs
    if (!page || isNaN(page) || page <= 0) {
        return res.render('form', { restaurants: null, error: 'Page must be a positive number.' });
    }
    // Validate items per page input
    if (!perPage || isNaN(perPage) || perPage <= 0) {
        return res.render('form', { restaurants: null, error: 'PerPage must be a positive number.' });
    }
    try {
        // Fetch restaurants based on the inputs
        const restaurants = await db.getAllRestaurants(+page, +perPage, borough);
        res.render('form', { restaurants, error: null });
    } catch (err) {
        // Handle errors (Display error message if error occured)
        res.render('form', { restaurants: null, error: 'Unable to fetch restaurants. Please try again later.' });
    }
});
module.exports = router;
