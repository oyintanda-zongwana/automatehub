import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('No token provided in request');
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    console.log('Token received:', token.substring(0, 10) + '...');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully:', { userId: decoded.userId });
    
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      console.log('User not found for token:', decoded.userId);
      return res.status(401).json({ message: 'User not found' });
    }

    console.log('User authenticated successfully:', user.email);
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', {
      name: error.name,
      message: error.message,
      expiredAt: error.expiredAt
    });
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    res.status(401).json({ message: 'Authentication failed' });
  }
};

export default auth; 