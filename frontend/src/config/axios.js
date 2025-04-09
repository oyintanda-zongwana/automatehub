import axios from 'axios';

// Create API instance with configuration
const api = axios.create({
    baseURL: 'https://automatehub-pdpd.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 20000 // Increased timeout to 20 seconds
});

// Log configuration on startup
console.log('API Configuration:', {
    baseURL: api.defaults.baseURL,
    timeout: api.defaults.timeout,
    headers: api.defaults.headers.common
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add token to requests if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Log outgoing requests for debugging
        console.log(`🚀 REQUEST: ${config.method?.toUpperCase()} ${config.url}`, { 
            headers: config.headers,
            data: config.data ? JSON.parse(JSON.stringify(config.data).replace(/"password":"[^"]*"/g, '"password":"[REDACTED]"')) : undefined
        });
        
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
        // Log successful responses
        console.log(`✅ RESPONSE: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`, {
            data: response.data,
            headers: response.headers
        });
        return response;
    },
    (error) => {
        // Enhanced error logging
        console.error('❌ API Error:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            config: error.config ? {
                url: error.config.url,
                method: error.config.method,
                baseURL: error.config.baseURL,
                timeout: error.config.timeout,
                headers: error.config.headers
            } : 'No config'
        });
        return Promise.reject(error);
    }
);

export default api; 