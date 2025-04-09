import { defineStore } from 'pinia';
import api from '../config/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token')
  }),

  actions: {
    async register(userData) {
      try {
        console.log('Auth store: register action called');
        
        // Ensure all required fields are present
        if (!userData.name || !userData.email || !userData.password) {
          console.error('Auth store: Missing required fields');
          throw new Error('All fields are required');
        }

        // Format the data
        const requestData = {
          name: userData.name.trim(),
          email: userData.email.trim().toLowerCase(),
          password: userData.password
        };

        console.log('Auth store: Sending registration request');
        
        // Make the request with explicit content type
        const response = await api.post('/auth/register', requestData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Auth store: Registration response received');
        
        if (!response.data) {
          console.error('Auth store: No response data received');
          throw new Error('No response data received');
        }

        const { token } = response.data;
        if (!token) {
          console.error('Auth store: No token received in response');
          throw new Error('No token received');
        }

        console.log('Auth store: Setting authentication state');
        this.token = token;
        this.isAuthenticated = true;
        localStorage.setItem('token', token);
        
        // Fetch user data after successful registration
        try {
          await this.fetchUser();
        } catch (fetchError) {
          console.error('Auth store: Failed to fetch user after registration', fetchError);
          // Continue even if fetch user fails
        }
        
        return response;
      } catch (error) {
        console.error('Auth store: Registration error:', {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          requestData: {
            name: userData.name,
            email: userData.email,
            hasPassword: !!userData.password
          }
        });
        throw error;
      }
    },

    async login(credentials) {
      try {
        const response = await api.post('/auth/login', credentials);
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
        await api.post('/auth/logout');
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
        const response = await api.get('/auth/me');
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