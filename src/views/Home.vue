<template>
  <div class="bg-white">
    <!-- Hero section -->
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block">Automate Your</span>
                <span class="block text-primary">Workflow Today</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Streamline your business processes with powerful automation tools. Save time, reduce errors, and boost productivity with AutomateHub.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <router-link
                    to="/register"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark md:py-4 md:text-lg md:px-10"
                  >
                    Get Started
                  </router-link>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <router-link
                    to="/pricing"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary-light hover:bg-primary-lighter md:py-4 md:text-lg md:px-10"
                  >
                    View Pricing
                  </router-link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10"></div>
        <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
    </div>

    <!-- Feature section -->
    <div class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to automate
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Powerful tools to streamline your workflow and boost productivity.
          </p>
        </div>

        <div class="mt-10">
          <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div v-for="feature in features" :key="feature.name" class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <component :is="feature.icon" class="h-6 w-6" aria-hidden="true" />
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{{ feature.name }}</p>
              <p class="mt-2 ml-16 text-base text-gray-500">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats section -->
    <div class="bg-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="stat in stats" :key="stat.name" class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <component :is="stat.icon" class="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">{{ stat.name }}</dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900">{{ stat.value }}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA section -->
    <div class="bg-primary">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span class="block">Ready to get started?</span>
          <span class="block text-primary-light">Start your free trial today.</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <router-link
              to="/register"
              class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-primary-lighter"
            >
              Get started
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  ChartBarIcon,
  CogIcon,
  LightningBoltIcon,
  UserGroupIcon,
  ClockIcon,
  ChartPieIcon,
  ShieldCheckIcon,
  CloudIcon
} from '@heroicons/vue/24/outline';

const features = ref([
  {
    name: 'Workflow Automation',
    description: 'Create custom workflows to automate repetitive tasks and streamline your processes.',
    icon: LightningBoltIcon
  },
  {
    name: 'Team Collaboration',
    description: 'Work together seamlessly with your team members in real-time.',
    icon: UserGroupIcon
  },
  {
    name: 'Analytics Dashboard',
    description: 'Get insights into your automation performance with detailed analytics.',
    icon: ChartBarIcon
  },
  {
    name: 'Custom Integrations',
    description: 'Connect with your favorite tools and services through our API.',
    icon: CogIcon
  }
]);

const stats = ref([
  { name: 'Active Users', value: '10,000+', icon: UserGroupIcon },
  { name: 'Automations Created', value: '50,000+', icon: LightningBoltIcon },
  { name: 'Time Saved', value: '1M+ hours', icon: ClockIcon },
  { name: 'Success Rate', value: '99.9%', icon: ChartPieIcon }
]);
</script>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
</style> 