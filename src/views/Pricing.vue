<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Simple, transparent pricing
        </h1>
        <p class="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Choose the perfect plan for your automation needs
        </p>
      </div>

      <div class="mt-12 grid gap-8 lg:grid-cols-4">
        <div v-for="tier in tiers" :key="tier.name" 
             class="relative bg-white rounded-2xl shadow-lg flex flex-col">
          <div class="p-8">
            <h2 class="text-2xl font-bold text-gray-900">{{ tier.name }}</h2>
            <p class="mt-4 text-gray-500">{{ tier.description }}</p>
            <p class="mt-8">
              <span class="text-4xl font-extrabold text-gray-900">${{ tier.price }}</span>
              <span class="text-base font-medium text-gray-500">/month</span>
            </p>
            <button
              @click="selectPlan(tier)"
              class="mt-8 block w-full bg-indigo-600 border border-transparent rounded-md py-3 text-sm font-semibold text-white text-center hover:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Get Started
            </button>
          </div>
          <div class="flex-1 flex flex-col justify-between p-8 bg-gray-50 rounded-b-2xl">
            <ul class="space-y-4">
              <li v-for="feature in tier.features" :key="feature" class="flex items-start">
                <CheckIcon class="flex-shrink-0 h-6 w-6 text-indigo-500" aria-hidden="true" />
                <span class="ml-3 text-base text-gray-700">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mt-16">
        <h2 class="text-3xl font-extrabold text-gray-900 text-center">
          Frequently asked questions
        </h2>
        <div class="mt-12 max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <dl class="mt-6 space-y-6 divide-y divide-gray-200">
            <div v-for="faq in faqs" :key="faq.question" class="pt-6">
              <dt class="text-lg">
                <button
                  @click="faq.isOpen = !faq.isOpen"
                  class="text-left w-full flex justify-between items-start text-gray-400"
                >
                  <span class="font-medium text-gray-900">{{ faq.question }}</span>
                  <span class="ml-6 h-7 flex items-center">
                    <ChevronDownIcon
                      :class="[faq.isOpen ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform']"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </dt>
              <dd v-show="faq.isOpen" class="mt-2 pr-12">
                <p class="text-base text-gray-500">{{ faq.answer }}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const tiers = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: [
      '10 tasks/month',
      'Basic workflows',
      'Community support',
      'Email notifications',
      'Basic analytics'
    ]
  },
  {
    name: 'Plus',
    price: 29,
    description: 'Best for growing teams',
    features: [
      '100 tasks/month',
      'Priority support',
      'Slack/Email integrations',
      'Advanced workflows',
      'Team collaboration',
      'API access'
    ]
  },
  {
    name: 'Pro',
    price: 79,
    description: 'For power users',
    features: [
      'Unlimited tasks',
      'Advanced analytics',
      'Custom branding',
      'Webhook integrations',
      'Custom workflows',
      'Priority support'
    ]
  },
  {
    name: 'Business',
    price: 199,
    description: 'For large organizations',
    features: [
      'Team management',
      'Activity tracking',
      'Enterprise support',
      'Custom integrations',
      'SLA guarantees',
      'Dedicated account manager'
    ]
  }
];

const faqs = ref([
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
    isOpen: false
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.',
    isOpen: false
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required.',
    isOpen: false
  }
]);

const selectPlan = async (tier) => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }
  
  try {
    // Here you would typically integrate with your payment processor
    console.log(`Selected plan: ${tier.name}`);
    // Redirect to checkout or show payment modal
  } catch (error) {
    console.error('Error selecting plan:', error);
  }
};
</script> 