<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-5 sm:px-0">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Create Workflow</h1>
            <p class="mt-2 text-sm text-gray-600">Set up a new automated workflow.</p>
          </div>
          <router-link
            to="/dashboard"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Dashboard
          </router-link>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="mt-6">
          <div class="rounded-md bg-red-50 p-4">
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
        <form @submit.prevent="handleSubmit" class="mt-6 space-y-8 divide-y divide-gray-200">
          <div class="space-y-8 divide-y divide-gray-200">
            <!-- Basic Information -->
            <div class="pt-8">
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900">Basic Information</h3>
                <p class="mt-1 text-sm text-gray-500">Provide the basic details for your workflow.</p>
              </div>

              <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-4">
                  <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      v-model="form.name"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div class="sm:col-span-6">
                  <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                  <div class="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      v-model="form.description"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <p class="mt-2 text-sm text-gray-500">Brief description of what this workflow does.</p>
                </div>
              </div>
            </div>

            <!-- Trigger Configuration -->
            <div class="pt-8">
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900">Trigger Configuration</h3>
                <p class="mt-1 text-sm text-gray-500">Define when this workflow should be triggered.</p>
              </div>

              <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label for="triggerType" class="block text-sm font-medium text-gray-700">Trigger Type</label>
                  <div class="mt-1">
                    <select
                      id="triggerType"
                      name="triggerType"
                      v-model="form.trigger.type"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="webhook">Webhook</option>
                      <option value="schedule">Schedule</option>
                      <option value="event">Event</option>
                    </select>
                  </div>
                </div>

                <!-- Schedule Configuration -->
                <div v-if="form.trigger.type === 'schedule'" class="sm:col-span-3">
                  <label for="schedule" class="block text-sm font-medium text-gray-700">Schedule (Cron Expression)</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      name="schedule"
                      id="schedule"
                      v-model="form.trigger.config.schedule"
                      placeholder="*/5 * * * *"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p class="mt-2 text-sm text-gray-500">Use cron syntax (e.g., "*/5 * * * *" for every 5 minutes)</p>
                </div>

                <!-- Event Configuration -->
                <div v-if="form.trigger.type === 'event'" class="sm:col-span-3">
                  <label for="eventType" class="block text-sm font-medium text-gray-700">Event Type</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      name="eventType"
                      id="eventType"
                      v-model="form.trigger.config.eventType"
                      placeholder="user.created"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p class="mt-2 text-sm text-gray-500">The type of event that triggers this workflow</p>
                </div>
              </div>
            </div>

            <!-- Actions Configuration -->
            <div class="pt-8">
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900">Actions</h3>
                <p class="mt-1 text-sm text-gray-500">Configure the actions to be executed when the workflow is triggered.</p>
              </div>

              <div class="mt-6 space-y-6">
                <div v-for="(action, index) in form.actions" :key="index" class="relative border rounded-lg p-4">
                  <button
                    type="button"
                    @click="removeAction(index)"
                    class="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
                  >
                    <span class="sr-only">Remove action</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>

                  <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                      <label :for="'actionType-' + index" class="block text-sm font-medium text-gray-700">Action Type</label>
                      <div class="mt-1">
                        <select
                          :id="'actionType-' + index"
                          v-model="action.type"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="http">HTTP Request</option>
                          <option value="email">Send Email</option>
                          <option value="ai">AI Task</option>
                        </select>
                      </div>
                    </div>

                    <!-- HTTP Configuration -->
                    <template v-if="action.type === 'http'">
                      <div class="sm:col-span-3">
                        <label :for="'method-' + index" class="block text-sm font-medium text-gray-700">Method</label>
                        <div class="mt-1">
                          <select
                            :id="'method-' + index"
                            v-model="action.config.method"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                          </select>
                        </div>
                      </div>

                      <div class="sm:col-span-6">
                        <label :for="'url-' + index" class="block text-sm font-medium text-gray-700">URL</label>
                        <div class="mt-1">
                          <input
                            type="url"
                            :id="'url-' + index"
                            v-model="action.config.url"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            required
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-6">
                        <label :for="'body-' + index" class="block text-sm font-medium text-gray-700">Request Body</label>
                        <div class="mt-1">
                          <textarea
                            :id="'body-' + index"
                            v-model="action.config.body"
                            rows="3"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                          ></textarea>
                        </div>
                      </div>
                    </template>

                    <!-- Email Configuration -->
                    <template v-if="action.type === 'email'">
                      <div class="sm:col-span-6">
                        <label :for="'to-' + index" class="block text-sm font-medium text-gray-700">To</label>
                        <div class="mt-1">
                          <input
                            type="email"
                            :id="'to-' + index"
                            v-model="action.config.to"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            required
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-6">
                        <label :for="'subject-' + index" class="block text-sm font-medium text-gray-700">Subject</label>
                        <div class="mt-1">
                          <input
                            type="text"
                            :id="'subject-' + index"
                            v-model="action.config.subject"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            required
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-6">
                        <label :for="'body-' + index" class="block text-sm font-medium text-gray-700">Email Body</label>
                        <div class="mt-1">
                          <textarea
                            :id="'body-' + index"
                            v-model="action.config.body"
                            rows="3"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                            required
                          ></textarea>
                        </div>
                      </div>
                    </template>

                    <!-- AI Configuration -->
                    <template v-if="action.type === 'ai'">
                      <div class="sm:col-span-3">
                        <label :for="'model-' + index" class="block text-sm font-medium text-gray-700">AI Model</label>
                        <div class="mt-1">
                          <select
                            :id="'model-' + index"
                            v-model="action.config.model"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="gpt-4">GPT-4</option>
                            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                          </select>
                        </div>
                      </div>

                      <div class="sm:col-span-6">
                        <label :for="'prompt-' + index" class="block text-sm font-medium text-gray-700">Prompt</label>
                        <div class="mt-1">
                          <textarea
                            :id="'prompt-' + index"
                            v-model="action.config.prompt"
                            rows="3"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                            required
                          ></textarea>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>

                <div class="flex justify-center">
                  <button
                    type="button"
                    @click="addAction"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    Add Action
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-5">
            <div class="flex justify-end">
              <router-link
                to="/dashboard"
                class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </router-link>
              <button
                type="submit"
                :disabled="loading"
                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  v-if="loading"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? 'Creating...' : 'Create Workflow' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useWorkflowStore } from '../stores/workflow';

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