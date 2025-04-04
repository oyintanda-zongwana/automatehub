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
        const response = await axios.post('/auth/register', userData);
        const { token, user } = response.data;
        
        this.token = token;
        this.user = user;
        this.isAuthenticated = true;
        
        localStorage.setItem('token', token);
        return response;
      } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
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