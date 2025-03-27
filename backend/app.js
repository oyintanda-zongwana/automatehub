const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const workflowRoutes = require('./routes/workflowRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workflows', workflowRoutes);

// Error handling
app.use(errorHandler);

// Load and schedule existing workflows
const Workflow = require('./models/Workflow');
const { scheduleWorkflow } = require('./controllers/workflowController');

async function loadExistingWorkflows() {
  try {
    const workflows = await Workflow.find({
      status: 'active',
      'trigger.type': 'schedule'
    });

    workflows.forEach(workflow => {
      scheduleWorkflow(workflow);
    });

    console.log(`Loaded ${workflows.length} scheduled workflows`);
  } catch (error) {
    console.error('Error loading workflows:', error);
  }
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  loadExistingWorkflows();
}); 