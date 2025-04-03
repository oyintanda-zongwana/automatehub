<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">Create Workflow</h1>
          <p class="mt-2 text-lg text-gray-600">Set up a new automated workflow.</p>
        </div>
        <router-link
          to="/dashboard"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Back to Dashboard
        </router-link>
      </div>

      <!-- Error Alert -->
      <div v-if="error" class="mb-8">
        <div class="rounded-lg bg-red-50 p-4 border border-red-200">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Error creating workflow</h3>
              <div class="mt-2 text-sm text-red-700">{{ error }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Basic Information Card -->
        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
          <div class="p-6">
            <div class="mb-6">
              <h3 class="text-xl font-semibold text-gray-900">Basic Information</h3>
              <p class="mt-1 text-sm text-gray-500">Provide the basic details for your workflow.</p>
            </div>

            <div class="grid grid-cols-1 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <div class="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    v-model="form.name"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                    placeholder="Enter workflow name"
                    required
                  />
                </div>
              </div>

              <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <div class="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    v-model="form.description"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                    placeholder="Describe what this workflow does..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Trigger Configuration Card -->
        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
          <div class="p-6">
            <div class="mb-6">
              <h3 class="text-xl font-semibold text-gray-900">Trigger Configuration</h3>
              <p class="mt-1 text-sm text-gray-500">Define when this workflow should be triggered.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="triggerType" class="block text-sm font-medium text-gray-700">Trigger Type</label>
                <div class="mt-1">
                  <select
                    id="triggerType"
                    name="triggerType"
                    v-model="form.trigger.type"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                  >
                    <option value="webhook">Webhook</option>
                    <option value="schedule">Schedule</option>
                    <option value="event">Event</option>
                  </select>
                </div>
              </div>

              <!-- Schedule Configuration -->
              <div v-if="form.trigger.type === 'schedule'">
                <label for="schedule" class="block text-sm font-medium text-gray-700">Schedule (Cron Expression)</label>
                <div class="mt-1">
                  <input
                    type="text"
                    name="schedule"
                    id="schedule"
                    v-model="form.trigger.config.schedule"
                    placeholder="*/5 * * * *"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                  />
                  <p class="mt-2 text-xs text-gray-500">Example: "*/5 * * * *" runs every 5 minutes</p>
                </div>
              </div>

              <!-- Event Configuration -->
              <div v-if="form.trigger.type === 'event'">
                <label for="eventType" class="block text-sm font-medium text-gray-700">Event Type</label>
                <div class="mt-1">
                  <input
                    type="text"
                    name="eventType"
                    id="eventType"
                    v-model="form.trigger.config.eventType"
                    placeholder="user.created"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                  />
                  <p class="mt-2 text-xs text-gray-500">Example: user.created, data.updated</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions Configuration -->
        <WorkflowActions
          :actions="form.actions"
          @add-action="addAction"
          @remove-action="removeAction"
        />

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Create Workflow
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useWorkflowStore } from '../stores/workflow';
import WorkflowActions from '@/components/WorkflowActions.vue';

const router = useRouter();
const workflowStore = useWorkflowStore();
const loading = ref(false);
const error = ref(null);

const form = reactive({
  name: '',
  description: '',
  trigger: {
    type: 'webhook',
    config: {
      schedule: '',
      eventType: ''
    }
  },
  actions: [
    {
      type: 'http',
      config: {
        method: 'GET',
        url: '',
        body: ''
      }
    }
  ]
});

const addAction = () => {
  form.actions.push({
    type: 'http',
    config: {
      method: 'GET',
      url: '',
      body: ''
    }
  });
};

const removeAction = (index) => {
  form.actions.splice(index, 1);
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = null;
    await workflowStore.createWorkflow(form);
    router.push('/dashboard');
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script> 