import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: String,
    enum: ['free', 'plus'],
    default: 'free'
  },
  tasksUsed: {
    type: Number,
    default: 0
  },
  taskLimit: {
    type: Number,
    default: 1 // Free plan limit
  },
  lastResetDate: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Method to check if user has reached task limit
subscriptionSchema.methods.hasReachedTaskLimit = function() {
  return this.tasksUsed >= this.taskLimit;
};

// Method to increment task usage
subscriptionSchema.methods.incrementTaskUsage = async function() {
  if (this.hasReachedTaskLimit()) {
    throw new Error('Task limit reached for current plan');
  }
  this.tasksUsed += 1;
  await this.save();
};

// Method to reset task usage (called monthly)
subscriptionSchema.methods.resetTaskUsage = async function() {
  this.tasksUsed = 0;
  this.lastResetDate = new Date();
  await this.save();
};

// Method to upgrade plan
subscriptionSchema.methods.upgradeToPlusPlan = async function() {
  this.plan = 'plus';
  this.taskLimit = 30;
  this.tasksUsed = 0;
  await this.save();
};

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription; 