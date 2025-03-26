import { defineStore } from 'pinia';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    isAuthenticated: false,
    error: null
  }),

  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getIsAuthenticated: (state) => state.isAuthenticated
  },

  actions: {
    async login(credentials) {
      try {
        console.log('Received credentials:', credentials);

        // Validate credentials
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        if (!credentials.email) {
          throw new Error('Email is required');
        }

        if (!credentials.password) {
          throw new Error('Password is required');
        }

        // Format credentials to match backend expectations
        const loginData = {
          email: credentials.email.trim(),
          password: credentials.password
        };

        console.log('Attempting login with:', { email: loginData.email });
        const response = await api.post('/auth/login', loginData);
        
        if (!response.data || !response.data.token) {
          throw new Error('Invalid response from server');
        }

        const { token } = response.data;
        
        // Set token and update state
        this.token = token;
        localStorage.setItem('token', token);
        this.isAuthenticated = true;
        
        // Set up axios defaults with the new token
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Fetch user data
        await this.fetchUser();
        return true;
      } catch (error) {
        console.error('Login error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          credentials: credentials ? { 
            email: credentials.email,
            hasPassword: !!credentials.password 
          } : 'undefined'
        });

        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        } else if (error.response) {
          throw new Error('Login failed. Please check your credentials.');
        } else if (error.request) {
          throw new Error('No response from server. Please check if the server is running.');
        } else {
          throw error;
        }
      }
    },

    async register(userData) {
      try {
        const response = await api.post('/auth/register', userData);
        const { token } = response.data;
        this.token = token;
        localStorage.setItem('token', token);
        this.isAuthenticated = true;
        await this.fetchUser();
        return true;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },

    async logout() {
      try {
        // Clear local state
        this.token = null;
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        return true;
      } catch (error) {
        console.error('Logout error:', error);
        // Even if there's an error, we should still clear the local state
        this.token = null;
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        return true;
      }
    },

    async fetchUser() {
      try {
        if (!this.token) return;
        
        const response = await api.get('/auth/me');
        this.user = response.data;
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Fetch user error:', error);
        this.token = null;
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('token');
        throw error;
      }
    },

    // Check if user is authenticated
    async checkAuth() {
      if (!this.token) return false;

      try {
        const response = await api.get('/auth/me');
        this.user = response.data;
        this.isAuthenticated = true;
        return true;
      } catch (error) {
        this.token = null;
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('token');
        return false;
      }
    },

    // Initialize auth state from localStorage
    initializeAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        this.fetchUser();
      }
    },

    // Set up axios defaults
    setupAxios() {
      if (this.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      }
    },

    handleError(err) {
      if (err.code === 'ECONNREFUSED') {
        this.error = 'Unable to connect to server. Please check if the server is running.';
      } else if (err.response) {
        this.error = err.response.data.message || 'An error occurred';
      } else {
        this.error = 'An unexpected error occurred';
      }
      throw new Error(this.error);
    },

    requestPasswordReset(email) {
      try {
        return api.post('/auth/forgot-password', { email });
      } catch (err) {
        this.handleError(err);
      }
    },

    resetPassword(token, password) {
      try {
        return api.post('/auth/reset-password', { token, password });
      } catch (err) {
        this.handleError(err);
      }
    },

    verifyEmail(token) {
      try {
        return api.post('/auth/verify-email', { token });
      } catch (err) {
        this.handleError(err);
      }
    },

    resendVerificationEmail() {
      try {
        return api.post('/auth/resend-verification');
      } catch (err) {
        this.handleError(err);
      }
    }
  }
}); 