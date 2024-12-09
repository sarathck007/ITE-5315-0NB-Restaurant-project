const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Retrieve the 'Authorization' header from the request
    const authHeader = req.headers['authorization'];
    // Extract the token from the 'Authorization' header
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // Proceed to the next middleware function
        next();
    } catch (err) {
        // Respond with a 403 (Forbidden) status if token fails
        res.status(403).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticateToken;
