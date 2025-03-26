<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-2xl font-bold text-indigo-600">
              AutomateHub
            </router-link>
          </div>

          <!-- Main Navigation -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.href"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600"
              :class="{ 'border-b-2 border-indigo-500': $route.path === item.href }"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <!-- Right side -->
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <template v-if="isAuthenticated">
            <!-- User dropdown -->
            <div class="ml-3 relative">
              <div>
                <button
                  @click="isOpen = !isOpen"
                  class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span class="sr-only">Open user menu</span>
                  <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span class="text-indigo-600 font-medium">{{ userInitials }}</span>
                  </div>
                </button>
              </div>

              <!-- Dropdown menu -->
              <div
                v-if="isOpen"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <router-link
                  to="/dashboard"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="isOpen = false"
                >
                  Dashboard
                </router-link>
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="isOpen = false"
                >
                  Profile
                </router-link>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click.prevent="handleLogout"
                >
                  Sign out
                </a>
              </div>
            </div>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign in
            </router-link>
            <router-link
              to="/register"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
            >
              Sign up
            </router-link>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="-mr-2 flex items-center sm:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.href"
          class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          @click="mobileMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <template v-if="isAuthenticated">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span class="text-indigo-600 font-medium">{{ userInitials }}</span>
              </div>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">{{ user?.name }}</div>
              <div class="text-sm font-medium text-gray-500">{{ user?.email }}</div>
            </div>
          </div>
          <div class="mt-3 space-y-1">
            <router-link
              to="/dashboard"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              @click="mobileMenuOpen = false"
            >
              Dashboard
            </router-link>
            <router-link
              to="/profile"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              @click="mobileMenuOpen = false"
            >
              Profile
            </router-link>
            <a
              href="#"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              @click.prevent="handleLogout"
            >
              Sign out
            </a>
          </div>
        </template>
        <template v-else>
          <div class="mt-3 space-y-1">
            <router-link
              to="/login"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              @click="mobileMenuOpen = false"
            >
              Sign in
            </router-link>
            <router-link
              to="/register"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              @click="mobileMenuOpen = false"
            >
              Sign up
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const isOpen = ref(false);
const mobileMenuOpen = ref(false);

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);
const userInitials = computed(() => {
  if (!user.value?.name) return '';
  return user.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
});

const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script> 