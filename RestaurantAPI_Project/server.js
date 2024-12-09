const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const initializeDB = require('./config/db');
const restaurantRoutes = require('./routes/restaurants');
const formRoutes = require('./routes/form');
const authRoutes = require('./routes/auth');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/', formRoutes);

// Connect to the database and start the server
const PORT = process.env.PORT || 3000;

// Initialize database connection
initializeDB(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed connection to the database:', error);
        process.exit(1);
    });
