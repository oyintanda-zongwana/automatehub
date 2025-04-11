import mongoose from 'mongoose';

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
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  steps: [{
    name: String,
    type: String,
    config: mongoose.Schema.Types.Mixed
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  successCount: {
    type: Number,
    default: 0
  },
  failureCount: {
    type: Number,
    default: 0
  },
  lastExecuted: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model('Workflow', workflowSchema);