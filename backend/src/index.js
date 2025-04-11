import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import subscriptionRoutes from './routes/subscription.js';
import scheduleTaskReset from './cron/resetTaskUsage.js';

dotenv.config();

const app = express();

// Request logging middleware - place before any other middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', {
    'content-type': req.headers['content-type'] || 'none',
    'origin': req.headers.origin || 'none'
  });
  
  // Capture the raw body for debugging
  let rawData = '';
  req.on('data', chunk => {
    rawData += chunk;
  });
  
  req.on('end', () => {
    if (rawData) {
      try {
        // Try to parse as JSON for debugging
        const jsonData = JSON.parse(rawData);
        console.log('Raw body (JSON):', {
          ...jsonData,
          password: jsonData.password ? '[REDACTED]' : undefined
        });
      } catch (e) {
        // Not JSON, just log as string (truncated)
        console.log('Raw body (not JSON):', rawData.substring(0, 200));
      }
    }
  });
  
  next();
});

// CORS handling
app.use(cors({
  origin: '*', // Allow all origins for testing
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

// Body parsing middleware - configure to handle different content types
app.use(express.json({ limit: '10mb', strict: false }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Debug middleware to log parsed body
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Parsed body:', {
      keys: Object.keys(req.body || {}),
      values: req.body ? {
        ...req.body,
        password: req.body.password ? '[REDACTED]' : undefined
      } : 'empty body'
    });
  }
  next();
});

app.use(morgan('dev'));

// MongoDB connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    // Start cron job after successful database connection
    scheduleTaskReset();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Handle MongoDB connection errors after initial connection
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// API health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/subscription', subscriptionRoutes);

// Root API endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    name: 'AutomateHub API',
    version: '1.0.0',
    endpoints: [
      '/api/auth/register',
      '/api/auth/login',
      '/api/auth/me',
      '/api/subscription/plans',
      '/api/health'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});