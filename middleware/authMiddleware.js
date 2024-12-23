import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import keys from '../config/keys.js';

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, keys.jwtSecret);
    const user = await User.findById(decoded.user.id);
    console.log('User:', user);
    console.log('token:', token);
    console.log('decoded:', decoded.user.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Please authenticate' });
  }
};

export { protect };