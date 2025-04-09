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

// CORS middleware
app.use(cors({
  origin: ['https://automatehub-pi.vercel.app', 'http://localhost:5173', '*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log(`Content-Type: ${req.headers['content-type'] || 'none'}`);
  console.log(`Origin: ${req.headers.origin || 'none'}`);
  next();
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Debug middleware to check request bodies
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Request body keys:', Object.keys(req.body || {}));
    if (req.body && Object.keys(req.body).length > 0) {
      const safeBody = { ...req.body };
      if (safeBody.password) safeBody.password = '[REDACTED]';
      console.log('Request body:', safeBody);
    } else {
      console.log('Request has empty body');
    }
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

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/subscription', subscriptionRoutes);

// API health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Root API route
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

// Root route
app.get('/', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>AutomateHub API</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1 { color: #333; }
          .endpoint { background: #f4f4f4; padding: 10px; margin-bottom: 10px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>AutomateHub API</h1>
        <p>The API is running. Try the following endpoints:</p>
        <div class="endpoint">/api/health - Check API status</div>
        <div class="endpoint">/api - API documentation</div>
        <div class="endpoint">/api/auth/register - Register a new user</div>
        <div class="endpoint">/api/auth/login - Login</div>
      </body>
    </html>
  `);
});

// Serve static assets
// Set the correct path to the public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

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