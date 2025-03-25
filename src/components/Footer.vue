<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <!-- Product Column -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Product</h3>
          <ul class="space-y-2">
            <li><a @click="navigateTo('/product')" class="text-gray-300 hover:text-white cursor-pointer">Overview</a></li>
            <li><a @click="navigateTo('/features')" class="text-gray-300 hover:text-white cursor-pointer">Features</a></li>
            <li><a @click="navigateTo('/pricing')" class="text-gray-300 hover:text-white cursor-pointer">Pricing</a></li>
            <li><a @click="navigateTo('/security')" class="text-gray-300 hover:text-white cursor-pointer">Security</a></li>
          </ul>
        </div>

        <!-- Company Column -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Company</h3>
          <ul class="space-y-2">
            <li><a @click="navigateTo('/about')" class="text-gray-300 hover:text-white cursor-pointer">About</a></li>
            <li><a @click="navigateTo('/blog')" class="text-gray-300 hover:text-white cursor-pointer">Blog</a></li>
            <li><a @click="navigateTo('/careers')" class="text-gray-300 hover:text-white cursor-pointer">Careers</a></li>
          </ul>
        </div>

        <!-- Resources Column -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Resources</h3>
          <ul class="space-y-2">
            <li><a @click="navigateTo('/documentation')" class="text-gray-300 hover:text-white cursor-pointer">Documentation</a></li>
            <li><a @click="navigateTo('/api-reference')" class="text-gray-300 hover:text-white cursor-pointer">API Reference</a></li>
            <li><a @click="navigateTo('/community')" class="text-gray-300 hover:text-white cursor-pointer">Community</a></li>
          </ul>
        </div>

        <!-- Legal Column -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Legal</h3>
          <ul class="space-y-2">
            <li><a @click="navigateTo('/privacy')" class="text-gray-300 hover:text-white cursor-pointer">Privacy</a></li>
            <li><a @click="navigateTo('/terms')" class="text-gray-300 hover:text-white cursor-pointer">Terms</a></li>
          </ul>
        </div>

        <!-- Contact Column -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <ul class="space-y-2">
            <li class="text-gray-300">
              <a href="mailto:support@automatehub.com" class="hover:text-white">
                support@automatehub.com
              </a>
            </li>
            <li class="text-gray-300">
              <a href="tel:0764801680" class="hover:text-white">
                076 480 1680
              </a>
            </li>
            <li><a @click="navigateTo('/contact')" class="text-gray-300 hover:text-white cursor-pointer">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-gray-700">
        <div class="text-center text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} AutomateHub. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateTo(path) {
  router.push(path);
}
</script> 