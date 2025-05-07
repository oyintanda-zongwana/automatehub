import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import routes
import authRoutes from './routes/auth.js';
import workflowRoutes from './routes/workflowRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

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

// Test route to verify backend deployment
app.get('/api/test', (req, res) => res.json({ message: 'Test route working' }));

// Error handling
app.use(errorHandler);

// Load and schedule existing workflows
import Workflow from './models/Workflow.js';
import { scheduleWorkflow } from './controllers/workflowController.js';

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