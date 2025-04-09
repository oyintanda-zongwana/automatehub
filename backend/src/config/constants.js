// Environment-specific configuration values

export const ENV = {
  // Node environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Server configuration
  PORT: process.env.PORT || 5000,
  
  // MongoDB connection
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/automatehub',
  
  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET || 'automatehub-secret-key',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '24h',
  
  // CORS configuration
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // API prefix
  API_PREFIX: '/api',
  
  // Service URLs
  SERVICE_URLS: {
    ROOT: '/',
    AUTH: '/auth',
    SUBSCRIPTION: '/subscription'
  }
}; 