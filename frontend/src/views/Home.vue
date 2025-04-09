<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Welcome to AutomateHub
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Your automation platform for business workflows
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="space-y-6">
          <div v-if="error" class="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{{ error }}</span>
          </div>

          <div v-if="apiStatus" class="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <span class="block sm:inline">{{ apiStatus }}</span>
          </div>

          <div class="flex flex-col space-y-4">
            <router-link to="/register" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </router-link>
            
            <router-link to="/login" class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </router-link>

            <button @click="checkApiStatus" class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span v-if="loading">Checking...</span>
              <span v-else>Check API Status</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../config/axios';

const apiStatus = ref('');
const error = ref('');
const loading = ref(false);

// Function to check API status
const checkApiStatus = async () => {
  try {
    loading.value = true;
    error.value = '';
    apiStatus.value = '';
    
    console.log('Checking API status...');
    const rootUrl = api.defaults.baseURL.replace('/api', '');
    
    const response = await fetch(rootUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const data = await response.json();
    apiStatus.value = `API is ${data.message ? 'running' : 'available'}: ${JSON.stringify(data)}`;
    console.log('API status check successful:', data);
  } catch (err) {
    console.error('API status check failed:', err);
    error.value = `Failed to connect to API: ${err.message}`;
  } finally {
    loading.value = false;
  }
};

// Check API status on component mount
checkApiStatus();
</script> 