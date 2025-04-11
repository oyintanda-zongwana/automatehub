import { defineStore } from 'pinia';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
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
        // Validate credentials
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Email and password are required');
        }

        // Format credentials
        const loginData = {
          email: credentials.email.trim().toLowerCase(),
          password: credentials.password
        };

        // Make login request
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
        console.error('Login error:', error);
        
        // Handle specific error cases
        if (error.response) {
          if (error.response.status === 400) {
            throw new Error('Invalid email or password');
          } else if (error.response.status === 401) {
            throw new Error('Unauthorized access');
          } else if (error.response.status === 500) {
            throw new Error('Server error. Please try again later.');
          }
        } else if (error.request) {
          throw new Error('No response from server. Please check your connection.');
        } else {
          throw error;
        }
      }
    },

    async register(userData) {
      try {
        // Validate user data
        if (!userData.name || !userData.email || !userData.password) {
          throw new Error('All fields are required');
        }

        // Format the data
        const registrationData = {
          name: userData.name.trim(),
          email: userData.email.trim().toLowerCase(),
          password: userData.password
        };

        // Make the registration request
        const response = await api.post('/auth/register', registrationData);
        
        if (!response.data || !response.data.token) {
          throw new Error('No token received from server');
        }

        const { token } = response.data;
        
        // Set token in localStorage and store
        this.token = token;
        localStorage.setItem('token', token);
        
        // Set up axios defaults with the new token
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Update authentication state
        this.isAuthenticated = true;
        
        // Fetch user data
        await this.fetchUser();
        
        return true;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },

    async logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
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
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.fetchUser();
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