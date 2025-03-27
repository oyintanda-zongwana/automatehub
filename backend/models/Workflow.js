const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'error'],
    default: 'inactive'
  },
  trigger: {
    type: {
      type: String,
      enum: ['webhook', 'schedule', 'event'],
      required: true
    },
    config: {
      schedule: String, // Cron expression for schedule triggers
      eventType: String, // Event type for event triggers
      webhook: {
        path: String, // Generated webhook path
        secret: String // Secret for webhook verification
      }
    }
  },
  actions: [{
    type: {
      type: String,
      enum: ['http', 'email', 'ai'],
      required: true
    },
    config: {
      // HTTP action config
      method: String,
      url: String,
      headers: Map,
      body: String,

      // Email action config
      to: String,
      subject: String,
      body: String,

      // AI action config
      model: String,
      prompt: String
    }
  }],
  lastRun: Date,
  nextRun: Date,
  successCount: {
    type: Number,
    default: 0
  },
  failureCount: {
    type: Number,
    default: 0
  },
  logs: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    level: {
      type: String,
      enum: ['info', 'error', 'warning']
    },
    message: String,
    details: mongoose.Schema.Types.Mixed
  }]
}, {
  timestamps: true
});

// Generate webhook path and secret when creating a new workflow with webhook trigger
workflowSchema.pre('save', function(next) {
  if (this.isNew && this.trigger.type === 'webhook') {
    this.trigger.config.webhook = {
      path: `/webhook/${this._id}/${generateSecret(16)}`,
      secret: generateSecret(32)
    };
  }
  next();
});

// Helper function to generate random secrets
function generateSecret(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const Workflow = mongoose.model('Workflow', workflowSchema);

module.exports = Workflow; 