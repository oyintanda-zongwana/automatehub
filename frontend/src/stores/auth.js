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
        // Ensure all required fields are present
        if (!userData.name || !userData.email || !userData.password) {
          throw new Error('All fields are required');
        }

        // Format the data
        const requestData = {
          name: userData.name.trim(),
          email: userData.email.trim().toLowerCase(),
          password: userData.password
        };

        // Make the request
        const response = await api.post('/auth/register', requestData);
        
        if (!response.data) {
          throw new Error('No response data received');
        }

        const { token, user } = response.data;
        if (!token) {
          throw new Error('No token received');
        }

        this.token = token;
        this.user = user;
        this.isAuthenticated = true;
        localStorage.setItem('token', token);
        
        return response;
      } catch (error) {
        console.error('Registration error:', {
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