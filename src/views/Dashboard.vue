<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Welcome Section -->
      <div class="px-4 py-5 sm:px-0">
        <h1 class="text-3xl font-bold text-gray-900">Welcome, {{ user?.name }}</h1>
        <p class="mt-2 text-sm text-gray-600">Manage your workflows and monitor their execution.</p>
      </div>

      <!-- Stats Section -->
      <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Active Workflows</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ activeWorkflows.length }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Executions</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ totalExecutions }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Success Rate</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ successRate }}%</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Workflows Section -->
      <div class="mt-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h2 class="text-xl font-semibold text-gray-900">Recent Workflows</h2>
            <p class="mt-2 text-sm text-gray-700">A list of your most recent workflows and their execution status.</p>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <router-link
              to="/workflows/create"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Create Workflow
            </router-link>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="mt-8 text-center">
          <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
          <p class="mt-2 text-sm text-gray-500">Loading workflows...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="mt-8">
          <div class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Error loading workflows</h3>
                <div class="mt-2 text-sm text-red-700">{{ error }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Workflow Table -->
        <div v-else class="mt-8 flex flex-col">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Run</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Success/Failure</th>
                      <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span class="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-if="!workflows || workflows.length === 0">
                      <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
                        No workflows yet - 
                        <router-link
                          to="/workflows/create"
                          class="text-indigo-600 hover:text-indigo-900"
                        >
                          Create one
                        </router-link>
                      </td>
                    </tr>
                    <tr v-for="workflow in workflows" :key="workflow._id">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <router-link :to="`/workflows/${workflow._id}`" class="hover:text-indigo-600">
                          {{ workflow.name }}
                        </router-link>
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm">
                        <span :class="['px-2 py-1 rounded-full text-xs font-medium', getStatusColor(workflow.status)]">
                          {{ workflow.status }}
                        </span>
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {{ formatDate(workflow.lastRun) }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {{ workflow.successCount || 0 }}/{{ workflow.failureCount || 0 }}
                      </td>
                      <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          @click="handleExecute(workflow._id)"
                          class="text-indigo-600 hover:text-indigo-900 mr-4"
                          title="Execute workflow"
                        >
                          Run
                        </button>
                        <button
                          @click="handleToggle(workflow._id)"
                          class="text-indigo-600 hover:text-indigo-900 mr-4"
                          :title="workflow.status === 'active' ? 'Deactivate workflow' : 'Activate workflow'"
                        >
                          {{ workflow.status === 'active' ? 'Stop' : 'Start' }}
                        </button>
                        <button
                          @click="handleDelete(workflow._id)"
                          class="text-red-600 hover:text-red-900"
                          title="Delete workflow"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useWorkflowStore } from '../store/modules/workflow';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const workflowStore = useWorkflowStore();
const { user } = storeToRefs(authStore);
const { workflows, loading, error } = storeToRefs(workflowStore);
const { activeWorkflows, totalExecutions, successRate } = storeToRefs(workflowStore);

onMounted(async () => {
  try {
    await workflowStore.fetchWorkflows();
  } catch (err) {
    console.error('Failed to fetch workflows:', err);
  }
});

const formatDate = (date) => {
  if (!date) return 'Never';
  return new Date(date).toLocaleString();
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'inactive': return 'bg-gray-100 text-gray-800';
    case 'error': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const handleExecute = async (id) => {
  try {
    await workflowStore.executeWorkflow(id);
  } catch (err) {
    console.error('Failed to execute workflow:', err);
  }
};

const handleToggle = async (id) => {
  try {
    await workflowStore.toggleWorkflow(id);
  } catch (err) {
    console.error('Failed to toggle workflow:', err);
  }
};

const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this workflow?')) return;
  try {
    await workflowStore.deleteWorkflow(id);
  } catch (err) {
    console.error('Failed to delete workflow:', err);
  }
};
</script> 