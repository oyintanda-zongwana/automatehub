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
        // Detailed logging of the incoming data
        console.log('Raw userData received:', userData);
        console.log('userData type:', typeof userData);
        console.log('userData properties:', Object.keys(userData));

        // Validate input data
        if (!userData.name || !userData.email || !userData.password) {
          console.error('Missing required fields:', {
            hasName: !!userData.name,
            hasEmail: !!userData.email,
            hasPassword: !!userData.password
          });
          throw new Error('All fields are required');
        }

        const requestData = {
          name: userData.name.trim(),
          email: userData.email.trim().toLowerCase(),
          password: userData.password
        };

        // Log the exact request data being sent
        console.log('Final request data structure:', {
          ...requestData,
          password: '[REDACTED]'
        });

        // Add explicit debugging for the request
        try {
          const response = await axios({
            method: 'post',
            url: '/auth/register',
            data: requestData,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
          
          console.log('Successful response:', response.data);
          
          const { token, user } = response.data;
          this.token = token;
          this.user = user;
          this.isAuthenticated = true;
          localStorage.setItem('token', token);
          return response;
        } catch (requestError) {
          console.error('Request failed with:', {
            status: requestError.response?.status,
            statusText: requestError.response?.statusText,
            data: requestError.response?.data,
            headers: requestError.response?.headers,
            requestData: requestData
          });
          throw requestError;
        }
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