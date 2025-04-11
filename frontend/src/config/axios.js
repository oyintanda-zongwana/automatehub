import axios from 'axios';

// Get base URL from environment variable or use default
const baseURL = import.meta.env.VITE_API_URL || 'https://automatehub-pdpd.onrender.com/api';

// Create API instance with configuration
const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000 // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Log outgoing requests for debugging
        if (import.meta.env.DEV) {
            console.log(`🚀 REQUEST: ${config.method?.toUpperCase()} ${config.url}`, { 
                headers: config.headers,
                data: config.data ? JSON.parse(JSON.stringify(config.data).replace(/"password":"[^"]*"/g, '"password":"[REDACTED]"')) : undefined
            });
        }
        
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // Log successful responses in development
        if (import.meta.env.DEV) {
            console.log(`✅ RESPONSE: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`, {
                data: response.data,
                headers: response.headers
            });
        }
        return response;
    },
    (error) => {
        // Handle specific error cases
        if (error.response) {
            // Server responded with error status
            if (error.response.status === 401) {
                // Token expired or invalid
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            
            // Enhanced error logging
            console.error('❌ API Error:', {
                message: error.message,
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data,
                config: {
                    url: error.config.url,
                    method: error.config.method,
                    baseURL: error.config.baseURL
                }
            });
        } else if (error.request) {
            // Request was made but no response received
            console.error('❌ Network Error:', 'No response received from server');
        } else {
            // Something happened in setting up the request
            console.error('❌ Request Error:', error.message);
        }
        
        return Promise.reject(error);
    }
);

export default api; 