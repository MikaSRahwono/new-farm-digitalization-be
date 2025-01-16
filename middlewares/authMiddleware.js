const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Middleware to verify JWT token
 */
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const user = await User.findByPk(decoded.id); // Fetch user from DB based on the ID from the token
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      req.user = user; // Attach user info to the request object
      next(); // Continue to the next middleware or route handler
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  });
};

module.exports = verifyToken;
