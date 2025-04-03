import express from 'express';
import auth from '../middleware/auth.js';
import paypalService from '../services/paypal.js';

const router = express.Router();

// Create PayPal order
router.post('/create-order', auth, async (req, res) => {
  try {
    const { amount, currency = 'USD', description } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const order = await paypalService.createOrder(amount, currency, description);
    res.json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Capture PayPal payment
router.post('/capture-payment/:orderId', auth, async (req, res) => {
  try {
    const { orderId } = req.params;
    const captureData = await paypalService.capturePayment(orderId);
    res.json(captureData);
  } catch (error) {
    console.error('Capture payment error:', error);
    res.status(500).json({ error: 'Failed to capture payment' });
  }
});

export default router; 