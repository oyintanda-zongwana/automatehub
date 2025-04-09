import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import subscriptionRoutes from './routes/subscription.js';
import scheduleTaskReset from './cron/resetTaskUsage.js';

dotenv.config();

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
  origin: ['https://automatehub-pi.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

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

// Support JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/subscription', subscriptionRoutes);

// Serve static assets
// Set the correct path to the public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// API status route - only respond with JSON when explicitly requesting JSON via Accept header
app.get('/api', (req, res) => {
  res.status(200).json({ 
    message: 'AutomateHub API is running',
    version: '1.0.0',
    endpoints: [
      '/api/auth',
      '/api/subscription'
    ]
  });
});

// Any routes not handled before will be handled by index.html (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 