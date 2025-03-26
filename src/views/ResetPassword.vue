<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Set new password
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Please enter your new password below
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              New password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirm new password
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {{ loading ? 'Updating password...' : 'Update password' }}
            </button>
          </div>
        </form>

        <div v-if="error" class="mt-4 text-sm text-red-600">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const form = reactive({
  password: '',
  confirmPassword: ''
});

const loading = ref(false);
const error = ref('');

onMounted(() => {
  // Check if token exists in URL
  if (!route.query.token) {
    error.value = 'Invalid or expired reset link.';
    setTimeout(() => router.push('/login'), 3000);
  }
});

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = '';

    // Validate passwords match
    if (form.password !== form.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Validate password strength
    if (form.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    await authStore.resetPassword(route.query.token, form.password);
    router.push('/login?message=Password updated successfully. Please login with your new password.');
  } catch (err) {
    error.value = err.message || 'Failed to update password. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script> 