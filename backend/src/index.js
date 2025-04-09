import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { ENV } from './config/constants.js';
import authRoutes from './routes/auth.js';
import subscriptionRoutes from './routes/subscription.js';
import scheduleTaskReset from './cron/resetTaskUsage.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ENV.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Add CORS options preflight handler
app.options('*', cors());

// Add request logging middleware
app.use((req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    url: req.url,
    origin: req.headers.origin,
    contentType: req.headers['content-type']
  });
  next();
});

app.use(express.json());
app.use(morgan('dev'));

// MongoDB connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Connect to MongoDB
mongoose.connect(ENV.MONGODB_URI, mongooseOptions)
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

// Routes
app.use(`${ENV.API_PREFIX}${ENV.SERVICE_URLS.AUTH}`, authRoutes);
app.use(`${ENV.API_PREFIX}${ENV.SERVICE_URLS.SUBSCRIPTION}`, subscriptionRoutes);

// Root route
app.get(ENV.SERVICE_URLS.ROOT, (req, res) => {
  res.status(200).json({ 
    message: 'AutomateHub API is running',
    version: '1.0.0',
    environment: ENV.NODE_ENV,
    endpoints: [
      `${ENV.API_PREFIX}${ENV.SERVICE_URLS.AUTH}`,
      `${ENV.API_PREFIX}${ENV.SERVICE_URLS.SUBSCRIPTION}`
    ]
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  console.log('Route not found:', req.originalUrl);
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: ENV.NODE_ENV === 'production' ? {} : {
      message: err.message,
      stack: err.stack
    }
  });
});

const PORT = ENV.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}${ENV.API_PREFIX}`);
}); 