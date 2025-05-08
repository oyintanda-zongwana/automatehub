import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import workflowRoutes from './routes/workflows.js';
import connectionTestRoutes from './routes/connectionTests.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api', connectionTestRoutes);
app.use('/api/ai', aiRoutes);

// Serve static files from the frontend build directory
const frontendDistPath = path.join(__dirname, '../../../frontend/dist');
console.log('Frontend dist path:', frontendDistPath);
app.use(express.static(frontendDistPath));

// Handle SPA routing - send all other requests to index.html
app.get('*', (req, res) => {
  const indexPath = path.join(frontendDistPath, 'index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});