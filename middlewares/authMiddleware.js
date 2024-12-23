import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import keys from '../config/keys.js';

// Protect middleware to verify JWT token and authenticate user
const protect = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

export { protect };