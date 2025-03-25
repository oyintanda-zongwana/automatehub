import cors from 'cors';

export default cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://yourapp.com' 
    : 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}); 