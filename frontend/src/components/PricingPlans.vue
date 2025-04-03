<template>
  <div class="bg-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-5xl font-extrabold text-gray-900 mb-4">
          Simple, transparent pricing
        </h2>
        <p class="text-xl text-gray-600">
          Choose the perfect plan for your automation needs
        </p>
      </div>

      <div class="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-4">
        <!-- Free Plan -->
        <div class="border border-gray-200 rounded-lg shadow-sm p-8 bg-white">
          <h3 class="text-2xl font-semibold text-gray-900">Free</h3>
          <p class="mt-4 text-lg text-gray-500">Perfect for getting started</p>
          <p class="mt-8">
            <span class="text-4xl font-extrabold text-gray-900">$0</span>
            <span class="text-xl text-gray-500">/month</span>
          </p>
          <button @click="startFreePlan" class="mt-8 block w-full bg-[#6366F1] border border-transparent rounded-md py-3 text-base font-semibold text-white text-center hover:bg-[#4F46E5]">
            Get Started
          </button>
          <ul class="mt-8 space-y-4">
            <li class="flex items-center">
              <CheckIcon class="flex-shrink-0 h-5 w-5 text-[#6366F1]" />
              <span class="ml-3 text-base text-gray-500">10 tasks/month</span>
            </li>
            <li class="flex items-center">
              <CheckIcon class="flex-shrink-0 h-5 w-5 text-[#6366F1]" />
              <span class="ml-3 text-base text-gray-500">Basic workflows</span>
            </li>
            <li class="flex items-center">
              <CheckIcon class="flex-shrink-0 h-5 w-5 text-[#6366F1]" />
              <span class="ml-3 text-base text-gray-500">Community support</span>
            </li>
          </ul>
        </div>

        <!-- Plus Plan -->
        <div class="border border-gray-200 rounded-lg shadow-sm p-8 bg-white">
          <h3 class="text-2xl font-semibold text-gray-900">Plus</h3>
          <p class="mt-4 text-lg text-gray-500">Best for growing teams</p>
          <p class="mt-8">
            <span class="text-4xl font-extrabold text-gray-900">$29</span>
            <span class="text-xl text-gray-500">/month</span>
          </p>
          <button @click="startPayment('plus')" class="mt-8 block w-full bg-[#6366F1] border border-transparent rounded-md py-3 text-base font-semibold text-white text-center hover:bg-[#4F46E5]">
            Get Started
          </button>
          <ul class="mt-8 space-y-4">
            <li class="flex items-center">
              <CheckIcon class="flex-shrink-0 h-5 w-5 text-[#6366F1]" />
              <span class="ml-3 text-base text-gray-500">100 tasks/month</span>
            </li>
            <li class="flex items-center">
              <CheckIcon class="flex-shrink-0 h-5 w-5 text-[#6366F1]" />
              <span class="ml-3 text-base text-gray-500">Priority support</span>
            </li>
            <li class="flex items-center">
              <CheckIcon class="flex-shrink-0 h-5 w-5 text-[#6366F1]" />
              <span class="ml-3 text-base text-gray-500">Slack/Email integrations</span>
            </li>
          </ul>
        </div>

        <!-- Pro Plan -->
        <div class="border border-gray-200 rounded-lg shadow-sm p-8 bg-white">
          <h3 class="text-2xl font-semibold text-gray-900">Pro</h3>
          <p class="mt-4 text-lg text-gray-500">For power users</p>
          <p class="mt-8">
            <span class="text-4xl font-extrabold text-gray-900">$79</span>
            <span class="text-xl text-gray-500">/month</span>
          </p>
          <button @click="startPayment('pro')" class="mt-8 block w-full bg-[#6366F1] border border-transparent rounded-md py-3 text-base font-semibold text-white text-center hover:bg-[#4F46E5]">
            Get Started
          </button>
          <ul class="mt-8 space-y-4">
            <li class="flex items-center">
              <CheckIcon class="flex-shrink-0 h-5 w-5 text-[#6366F1]" />
              <span class="ml-3 text-base text-gray-500">Unlimited tasks</span>
            </li>
            <li class="flex items-center">
              <CheckIcon class="flex-shrink-0 h-5 w-5 text-[#6366F1]" />
              <span class="ml-3 text-base text-gray-500">Advanced analytics</span>
            </li>
            <li class="flex items-center">
              <CheckIcon class="flex-shrink-0 h-5 w-5 text-[#6366F1]" />
              <span class="ml-3 text-base text-gray-500">Custom branding</span>
            </li>
          </ul>
        </div>

        <!-- Business Plan -->
        <div class="border border-gray-200 rounded-lg shadow-sm p-8 bg-white">
          <h3 class="text-2xl font-semibold text-gray-900">Business</h3>
          <p class="mt-4 text-lg text-gray-500">For large organizations</p>
          <p class="mt-8">
            <span class="text-4xl font-extrabold text-gray-900">$199</span>
            <span class="text-xl text-gray-500">/month</span>
          </p>
          <button @click="startPayment('business')" class="mt-8 block w-full bg-[#6366F1] border border-transparent rounded-md py-3 text-base font-semibold text-white text-center hover:bg-[#4F46E5]">
            Get Started
          </button>
          <ul class="mt-8 space-y-4">
            <li class="flex items-center">
              <CheckIcon class="flex-shrink-0 h-5 w-5 text-[#6366F1]" />
              <span class="ml-3 text-base text-gray-500">Team management</span>
            </li>
            <li class="flex items-center">
              <CheckIcon class="flex-shrink-0 h-5 w-5 text-[#6366F1]" />
              <span class="ml-3 text-base text-gray-500">Activity tracking</span>
            </li>
            <li class="flex items-center">
              <CheckIcon class="flex-shrink-0 h-5 w-5 text-[#6366F1]" />
              <span class="ml-3 text-base text-gray-500">Enterprise support</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore();

const CheckIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
    </svg>
  `
};

const startFreePlan = () => {
  if (!authStore.isAuthenticated) {
    router.push('/register');
  } else {
    router.push('/dashboard');
  }
};

const startPayment = async (plan) => {
  if (!authStore.isAuthenticated) {
    router.push('/register');
    return;
  }

  try {
    // Create PayPal order based on the selected plan
    const response = await axios.post('/api/payments/create-order', {
      plan: plan,
      amount: getPlanAmount(plan)
    });

    // Redirect to PayPal checkout
    window.location.href = response.data.approvalUrl;
  } catch (error) {
    console.error('Error initiating payment:', error);
    alert('Failed to initiate payment. Please try again.');
  }
};

const getPlanAmount = (plan) => {
  const prices = {
    plus: 29,
    pro: 79,
    business: 199
  };
  return prices[plan] || 0;
};
</script> 