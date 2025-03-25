import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token') || null);

  const login = async (credentials) => {
    try {
      // TODO: Implement actual API call
      // For now, simulate a successful login
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: credentials.email,
        avatar: null
      };
      const mockToken = 'mock-jwt-token';
      
      user.value = mockUser;
      token.value = mockToken;
      localStorage.setItem('token', mockToken);
      
      return mockUser;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // TODO: Implement actual API call
      // For now, simulate a successful registration
      const mockUser = {
        id: 1,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        avatar: null
      };
      const mockToken = 'mock-jwt-token';
      
      user.value = mockUser;
      token.value = mockToken;
      localStorage.setItem('token', mockToken);
      
      return mockUser;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // TODO: Implement actual API call
      user.value = null;
      token.value = null;
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const checkAuth = async () => {
    if (!token.value) {
      user.value = null;
      return false;
    }

    try {
      // TODO: Implement actual API call to verify token
      // For now, simulate a valid token
      return true;
    } catch (error) {
      console.error('Auth check failed:', error);
      user.value = null;
      token.value = null;
      localStorage.removeItem('token');
      return false;
    }
  };

  return {
    user,
    token,
    login,
    register,
    logout,
    checkAuth
  };
}); 