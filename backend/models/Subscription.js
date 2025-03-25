import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  planType: { type: String, enum: ['free', 'plus', 'pro', 'business'] },
  paymentStatus: { type: String, enum: ['active', 'past_due', 'canceled'] },
  renewalDate: Date
});

export default mongoose.model('Subscription', subscriptionSchema); 