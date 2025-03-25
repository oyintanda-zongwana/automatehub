import express from 'express';
import { verifyToken } from './auth.js';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';

const router = express.Router();

// Get user's subscription
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('subscription');
    if (!user.subscription) {
      return res.json({ planType: 'free' });
    }
    res.json(user.subscription);
  } catch (error) {
    console.error('Subscription fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update subscription
router.post('/update', verifyToken, async (req, res) => {
  try {
    const { planType } = req.body;
    const user = await User.findById(req.userId);

    // Validate plan type
    const validPlans = ['free', 'plus', 'pro', 'business'];
    if (!validPlans.includes(planType)) {
      return res.status(400).json({ message: 'Invalid plan type' });
    }

    // Create or update subscription
    let subscription = await Subscription.findOne({ userId: req.userId });
    
    if (!subscription) {
      subscription = new Subscription({
        userId: req.userId,
        planType,
        paymentStatus: planType === 'free' ? 'active' : 'pending',
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      });
    } else {
      subscription.planType = planType;
      subscription.paymentStatus = planType === 'free' ? 'active' : 'pending';
      subscription.renewalDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }

    await subscription.save();

    // Update user's subscription reference
    user.subscription = subscription._id;
    await user.save();

    res.json(subscription);
  } catch (error) {
    console.error('Subscription update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel subscription
router.post('/cancel', verifyToken, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.userId });
    
    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription found' });
    }

    subscription.paymentStatus = 'canceled';
    await subscription.save();

    res.json({ message: 'Subscription canceled successfully' });
  } catch (error) {
    console.error('Subscription cancellation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Webhook for payment processing
router.post('/webhook', async (req, res) => {
  try {
    const { userId, planType, paymentStatus } = req.body;

    const subscription = await Subscription.findOne({ userId });
    if (subscription) {
      subscription.paymentStatus = paymentStatus;
      subscription.planType = planType;
      subscription.renewalDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      await subscription.save();
    }

    res.json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 