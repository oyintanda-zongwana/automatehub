import { defineStore } from 'pinia';
import axios from '../config/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token')
  }),

  actions: {
    async register(userData) {
      try {
        // Log the incoming data
        console.log('Auth store received registration data:', {
          ...userData,
          password: '[REDACTED]'
        });

        // Create a clean request payload
        const requestData = {
          name: userData.name,
          email: userData.email,
          password: userData.password
        };

        console.log('Sending registration request with data:', {
          ...requestData,
          password: '[REDACTED]'
        });

        // Make sure we're sending the data as JSON
        const response = await axios.post('/auth/register', JSON.stringify(requestData), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const { token, user } = response.data;
        
        this.token = token;
        this.user = user;
        this.isAuthenticated = true;
        
        localStorage.setItem('token', token);
        return response;
      } catch (error) {
        console.error('Registration error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          statusText: error.response?.statusText
        });
        throw error;
      }
    },

    async login(credentials) {
      try {
        const response = await axios.post('/auth/login', credentials);
        const { token, user } = response.data;

        this.token = token;
        this.user = user;
        this.isAuthenticated = true;

        localStorage.setItem('token', token);
        return response;
      } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
      }
    },

    async logout() {
      try {
        await axios.post('/auth/logout');
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.token = null;
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('token');
      }
    },

    async fetchUser() {
      try {
        const response = await axios.get('/auth/me');
        this.user = response.data;
        return response;
      } catch (error) {
        console.error('Fetch user error:', error);
        this.token = null;
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('token');
        throw error;
      }
    }
  }
}); 