<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/" class="text-2xl font-bold text-indigo-600">
                AutomateHub
              </router-link>
            </div>
            <!-- Navigation Links -->
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <template v-if="isAuthenticated">
                <router-link
                  to="/dashboard"
                  class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  :class="{ 'border-b-2 border-indigo-500': $route.path === '/dashboard' }"
                >
                  Dashboard
                </router-link>
                <router-link
                  to="/workflows/create"
                  class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                  :class="{ 'border-b-2 border-indigo-500': $route.path === '/workflows/create' }"
                >
                  Create Workflow
                </router-link>
              </template>
              <template v-else>
                <router-link
                  to="/"
                  class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  :class="{ 'border-b-2 border-indigo-500': $route.path === '/' }"
                >
                  Home
                </router-link>
                <router-link
                  to="/pricing"
                  class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                  :class="{ 'border-b-2 border-indigo-500': $route.path === '/pricing' }"
                >
                  Pricing
                </router-link>
              </template>
            </div>
          </div>
          <!-- Right side -->
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <template v-if="isAuthenticated">
              <router-link
                to="/dashboard"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Dashboard
              </router-link>
              <button
                @click="logout"
                class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Sign out
              </button>
            </template>
            <template v-else>
              <router-link
                to="/login"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
              >
                Sign in
              </router-link>
              <router-link
                to="/register"
                class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign up
              </router-link>
            </template>
          </div>
          <!-- Mobile menu button -->
          <div class="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              @click="mobileMenuOpen = !mobileMenuOpen"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="h-6 w-6"
                :class="{ 'hidden': mobileMenuOpen, 'block': !mobileMenuOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                class="h-6 w-6"
                :class="{ 'block': mobileMenuOpen, 'hidden': !mobileMenuOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div class="sm:hidden" :class="{ 'block': mobileMenuOpen, 'hidden': !mobileMenuOpen }">
        <div class="pt-2 pb-3 space-y-1">
          <router-link
            to="/"
            class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            :class="{ 'bg-gray-50 border-l-4 border-indigo-500': $route.path === '/' }"
          >
            Home
          </router-link>
          <router-link
            to="/pricing"
            class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            :class="{ 'bg-gray-50 border-l-4 border-indigo-500': $route.path === '/pricing' }"
          >
            Pricing
          </router-link>
          <template v-if="isAuthenticated">
            <router-link
              to="/dashboard"
              class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              :class="{ 'bg-gray-50 border-l-4 border-indigo-500': $route.path === '/dashboard' }"
            >
              Dashboard
            </router-link>
            <button
              @click="logout"
              class="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Sign out
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              :class="{ 'bg-gray-50 border-l-4 border-indigo-500': $route.path === '/login' }"
            >
              Sign in
            </router-link>
            <router-link
              to="/register"
              class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              :class="{ 'bg-gray-50 border-l-4 border-indigo-500': $route.path === '/register' }"
            >
              Sign up
            </router-link>
          </template>
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

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

export default {
  name: 'App',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const mobileMenuOpen = ref(false)

    const isAuthenticated = computed(() => authStore.isAuthenticated)

    const logout = async () => {
      await authStore.logout()
      router.push('/')
    }

    // Initialize auth state when the app starts
    authStore.initializeAuth()

    return {
      mobileMenuOpen,
      isAuthenticated,
      logout
    }
  }
}
</script>

<style>
@import './assets/main.css';
</style>
