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
        // Log the request data (excluding password)
        console.log('Sending registration request:', {
          name: userData.name,
          email: userData.email,
          hasPassword: !!userData.password
        });

        // Make the request with explicit headers
        const response = await api({
          method: 'POST',
          url: '/auth/register',
          data: userData,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        
        const { token, user } = response.data;
        this.token = token;
        this.user = user;
        this.isAuthenticated = true;
        localStorage.setItem('token', token);
        
        return response;
      } catch (error) {
        // Enhanced error logging
        console.error('Registration error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
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