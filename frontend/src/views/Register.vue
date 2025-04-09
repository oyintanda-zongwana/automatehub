<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div v-if="error" class="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{{ error }}</span>
          </div>

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div class="mt-1">
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="formData.password"
                type="password"
                required
                minlength="6"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <p class="mt-1 text-sm text-gray-500">Must be at least 6 characters long</p>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <span v-if="loading">Registering...</span>
              <span v-else>Register</span>
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Already have an account?
                <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
                </router-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Force new deployment timestamp: {{ new Date().toISOString() }}
const router = useRouter();
const authStore = useAuthStore();

const formData = ref({
  name: '',
  email: '',
  password: ''
});

// Add watcher to log form data changes
watch(formData, (newVal) => {
  console.log('Form data changed:', {
    name: newVal.name,
    email: newVal.email,
    password: newVal.password ? '[REDACTED]' : undefined
  });
}, { deep: true });

const error = ref('');
const loading = ref(false);

const handleSubmit = async () => {
  try {
    console.log('Form submission started');
    loading.value = true;
    error.value = '';
    
    // Get form values and trim whitespace
    const name = formData.value.name.trim();
    const email = formData.value.email.trim().toLowerCase();
    const password = formData.value.password;

    // Client-side validation
    if (!name || !email || !password) {
      error.value = 'All fields are required';
      loading.value = false;
      return;
    }

    if (password.length < 6) {
      error.value = 'Password must be at least 6 characters long';
      loading.value = false;
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      error.value = 'Please enter a valid email address';
      loading.value = false;
      return;
    }

    // Create payload
    const userData = { name, email, password };
    console.log('Sending registration data:', {
      ...userData,
      password: '[REDACTED]'
    });

    // Create Axios instance directly for this request only
    const axios = (await import('axios')).default;
    const API_URL = 'https://automatehub-pdpd.onrender.com/api';
    
    // Make direct axios call
    const response = await axios.post(`${API_URL}/auth/register`, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Registration successful:', response.data);
    
    // Store the token
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      authStore.token = response.data.token;
      authStore.isAuthenticated = true;
      
      // Try to fetch user data after registration
      try {
        await authStore.fetchUser();
      } catch (e) {
        console.error('Failed to fetch user after registration:', e);
      }
    }
    
    router.push('/dashboard');
  } catch (err) {
    console.error('Registration failed:', err);
    if (err.response) {
      console.error('Error response:', err.response.data);
      if (err.response.data.errors) {
        error.value = err.response.data.errors.map(e => e.msg).join(', ');
      } else if (err.response.data.message) {
        error.value = err.response.data.message;
      } else {
        error.value = `Error ${err.response.status}: ${err.response.statusText}`;
      }
    } else if (err.request) {
      error.value = 'No response received from server';
    } else {
      error.value = err.message || 'Registration failed';
    }
  } finally {
    loading.value = false;
  }
};
</script> 