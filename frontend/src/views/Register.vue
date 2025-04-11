<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="space-y-6">
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
                type="text"
                required
                :value="name"
                @input="name = $event.target.value"
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
                type="email"
                required
                :value="email"
                @input="email = $event.target.value"
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
                type="password"
                required
                minlength="6"
                :value="password"
                @input="password = $event.target.value"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <p class="mt-1 text-sm text-gray-500">Must be at least 6 characters long</p>
          </div>

          <div>
            <button
              type="button"
              @click="registerUser"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <span v-if="loading">Registering...</span>
              <span v-else>Register</span>
            </button>
          </div>
        </div>

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

<script>
export default {
  name: 'Register',
  
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: '',
      loading: false
    };
  },
  
  methods: {
    async registerUser() {
      console.log('Registration attempt started');
      this.error = '';
      this.loading = true;
      
      try {
        // Basic validation
        if (!this.name || !this.email || !this.password) {
          this.error = 'All fields are required';
          this.loading = false;
          return;
        }
        
        if (this.password.length < 6) {
          this.error = 'Password must be at least 6 characters long';
          this.loading = false;
          return;
        }
        
        // Prepare data
        const data = {
          name: this.name.trim(),
          email: this.email.trim().toLowerCase(),
          password: this.password
        };
        
        // Use the auth store for registration
        const { useAuthStore } = require('../stores/auth');
        const authStore = useAuthStore();
        await authStore.register(data);
        
        // Redirect to dashboard on success
        this.$router.push('/dashboard');
      } catch (err) {
        console.error('Registration error:', err);
        this.error = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script> 