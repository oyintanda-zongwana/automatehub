<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="h-8 w-auto" src="/logo.svg" alt="AutomateHub" />
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                :class="{ 'border-b-2 border-primary': $route.path === item.href }"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
          <div class="flex items-center">
            <template v-if="!isAuthenticated">
              <router-link
                to="/login"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Log in
              </router-link>
              <router-link
                to="/register"
                class="ml-4 bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark"
              >
                Get Started
              </router-link>
            </template>
            <template v-else>
              <div class="relative ml-3">
                <button
                  @click="toggleUserMenu"
                  class="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <img
                    :src="user.avatar || '/default-avatar.png'"
                    class="h-8 w-8 rounded-full"
                    alt="User avatar"
                  />
                  <span class="text-sm font-medium">{{ user.name }}</span>
                </button>
                <!-- User menu dropdown -->
                <div
                  v-if="showUserMenu"
                  class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  <div class="py-1">
                    <router-link
                      to="/dashboard"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      @click="showUserMenu = false"
                    >
                      Dashboard
                    </router-link>
                    <router-link
                      to="/settings"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      @click="showUserMenu = false"
                    >
                      Settings
                    </router-link>
                    <button
                      @click="logout"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      @click="showUserMenu = false"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main>
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
            <ul class="mt-4 space-y-4">
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Features</a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Pricing</a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Security</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul class="mt-4 space-y-4">
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">About</a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Blog</a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Careers</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
            <ul class="mt-4 space-y-4">
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Documentation</a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">API Reference</a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Community</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul class="mt-4 space-y-4">
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Privacy</a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Terms</a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-8 border-t border-gray-200 pt-8">
          <p class="text-base text-gray-400 text-center">
            &copy; {{ new Date().getFullYear() }} AutomateHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const showUserMenu = ref(false);
const isAuthenticated = ref(false);
const user = ref({});

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
];

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style>
@import './assets/main.css';
</style>
