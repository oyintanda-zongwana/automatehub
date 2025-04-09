import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET api/subscription/plans
// @desc    Get available subscription plans
// @access  Public
router.get('/plans', async (req, res) => {
  try {
    // TODO: Implement subscription plans logic
    const plans = [
      {
        id: 'basic',
        name: 'Basic',
        price: 0,
        features: ['Limited workflows', 'Basic automation']
      },
      {
        id: 'pro',
        name: 'Professional',
        price: 9.99,
        features: ['Unlimited workflows', 'Advanced automation', 'Priority support']
      }
    ];
    res.json(plans);
  } catch (err) {
    console.error('Error fetching subscription plans:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/subscription/current
// @desc    Get current user's subscription
// @access  Private
router.get('/current', auth, async (req, res) => {
  try {
    // TODO: Implement current subscription logic
    res.json({
      plan: 'basic',
      status: 'active',
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });
  } catch (err) {
    console.error('Error fetching current subscription:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 