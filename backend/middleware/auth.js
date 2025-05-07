import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    console.log('Authorization header:', authHeader);
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      console.log('User not found for token:', decoded.userId);
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    console.log('Token verification error:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

export const checkSubscription = (allowedPlans) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId).populate('subscription');
      
      if (!user.subscription || !allowedPlans.includes(user.subscription.planType)) {
        return res.status(403).json({ 
          message: 'This feature requires a higher subscription plan' 
        });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
}; 