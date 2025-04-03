import express from 'express';
import Subscription from '../models/Subscription.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get user's subscription details
router.get('/me', auth, async (req, res) => {
  try {
    let subscription = await Subscription.findOne({ user: req.user.id });
    
    if (!subscription) {
      // Create free subscription if none exists
      subscription = new Subscription({
        user: req.user.id,
        plan: 'free',
        taskLimit: 1
      });
      await subscription.save();
    }
    
    res.json(subscription);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Increment task usage
router.post('/increment-task', auth, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user.id });
    
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    if (subscription.hasReachedTaskLimit()) {
      return res.status(403).json({ 
        message: 'Task limit reached. Please upgrade your plan for more tasks.',
        currentUsage: subscription.tasksUsed,
        limit: subscription.taskLimit
      });
    }

    await subscription.incrementTaskUsage();
    res.json(subscription);
  } catch (error) {
    console.error('Error incrementing task usage:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// Upgrade to Plus plan
router.post('/upgrade', auth, async (req, res) => {
  try {
    let subscription = await Subscription.findOne({ user: req.user.id });
    
    if (!subscription) {
      subscription = new Subscription({ user: req.user.id });
    }

    await subscription.upgradeToPlusPlan();
    
    // Set expiration date to 30 days from now
    subscription.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await subscription.save();

    res.json(subscription);
  } catch (error) {
    console.error('Error upgrading subscription:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get subscription status
router.get('/status', auth, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user.id });
    
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.json({
      plan: subscription.plan,
      tasksUsed: subscription.tasksUsed,
      taskLimit: subscription.taskLimit,
      remainingTasks: subscription.taskLimit - subscription.tasksUsed,
      expiresAt: subscription.expiresAt
    });
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 