<template>
  <div class="min-h-screen bg-gray-100">
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <!-- Stats -->
        <div class="mt-8">
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Active Automations</dt>
                      <dd class="flex items-baseline">
                        <div class="text-2xl font-semibold text-gray-900">12</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Time Saved</dt>
                      <dd class="flex items-baseline">
                        <div class="text-2xl font-semibold text-gray-900">24h</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Success Rate</dt>
                      <dd class="flex items-baseline">
                        <div class="text-2xl font-semibold text-gray-900">98%</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="mt-8">
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
            </div>
            <ul class="divide-y divide-gray-200">
              <li v-for="activity in recentActivity" :key="activity.id" class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <component :is="activity.icon" class="h-5 w-5 text-gray-400" />
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                      <p class="text-sm text-gray-500">{{ activity.description }}</p>
                    </div>
                  </div>
                  <div class="ml-2 flex-shrink-0 flex">
                    <p class="text-sm text-gray-500">{{ activity.time }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  BoltIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon
} from '@heroicons/vue/24/outline';

const recentActivity = ref([
  {
    id: 1,
    title: 'Data Sync Completed',
    description: 'Successfully synced 150 records from CRM',
    time: '2 minutes ago',
    icon: CheckCircleIcon
  },
  {
    id: 2,
    title: 'Email Campaign Started',
    description: 'Bulk email campaign initiated for 500 subscribers',
    time: '15 minutes ago',
    icon: BoltIcon
  },
  {
    id: 3,
    title: 'Task Reminder',
    description: 'Scheduled reminder for team meeting',
    time: '1 hour ago',
    icon: ClockIcon
  },
  {
    id: 4,
    title: 'Error Detected',
    description: 'Failed to process 3 records in data import',
    time: '2 hours ago',
    icon: ExclamationCircleIcon
  }
]);
</script> 