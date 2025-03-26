<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Create New Workflow
          </h3>
          
          <form @submit.prevent="handleSubmit" class="mt-5 space-y-6">
            <!-- Workflow Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                Workflow Name
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  v-model="form.name"
                  required
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter workflow name"
                />
              </div>
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div class="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  v-model="form.description"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter workflow description"
                ></textarea>
              </div>
            </div>

            <!-- Trigger Type -->
            <div>
              <label for="triggerType" class="block text-sm font-medium text-gray-700">
                Trigger Type
              </label>
              <div class="mt-1">
                <select
                  id="triggerType"
                  name="triggerType"
                  v-model="form.triggerType"
                  required
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select a trigger type</option>
                  <option value="manual">Manual Trigger</option>
                  <option value="schedule">Schedule (Cron)</option>
                  <option value="webhook">Webhook</option>
                  <option value="event">Event Based</option>
                  <option value="file_change">File Change</option>
                  <option value="email_received">Email Received</option>
                  <option value="database_change">Database Change</option>
                  <option value="api_response">API Response</option>
                  <option value="form_submission">Form Submission</option>
                  <option value="message_queue">Message Queue</option>
                </select>
              </div>
            </div>

            <!-- Schedule (if trigger type is schedule) -->
            <div v-if="form.triggerType === 'schedule'">
              <label for="schedule" class="block text-sm font-medium text-gray-700">
                Schedule (Cron Expression)
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  name="schedule"
                  id="schedule"
                  v-model="form.schedule"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="* * * * *"
                />
                <p class="mt-1 text-sm text-gray-500">
                  Enter a cron expression (e.g., "0 0 * * *" for daily at midnight)
                </p>
              </div>
            </div>

            <!-- Actions -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Actions
              </label>
              <div class="mt-2 space-y-4">
                <div v-for="(action, index) in form.actions" :key="index" class="flex items-start space-x-4">
                  <div class="flex-1">
                    <select
                      v-model="action.type"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select action type</option>
                      <!-- AI Actions -->
                      <option value="text_generation">AI Text Generation</option>
                      <option value="image_generation">AI Image Generation</option>
                      <option value="text_analysis">AI Text Analysis</option>
                      <option value="sentiment_analysis">Sentiment Analysis</option>
                      <option value="document_processing">Document Processing</option>
                      <option value="translation">Language Translation</option>
                      <option value="summarization">Text Summarization</option>
                      <option value="classification">Content Classification</option>
                      <!-- Data Processing Actions -->
                      <option value="data_transformation">Data Transformation</option>
                      <option value="data_validation">Data Validation</option>
                      <option value="data_enrichment">Data Enrichment</option>
                      <!-- Communication Actions -->
                      <option value="email">Send Email</option>
                      <option value="slack">Send Slack Message</option>
                      <option value="webhook">Send Webhook</option>
                      <option value="sms">Send SMS</option>
                      <option value="push_notification">Push Notification</option>
                      <!-- Integration Actions -->
                      <option value="api_request">API Request</option>
                      <option value="database_operation">Database Operation</option>
                      <option value="file_operation">File Operation</option>
                      <option value="queue_message">Queue Message</option>
                      <!-- System Actions -->
                      <option value="script">Run Script</option>
                      <option value="function">Execute Function</option>
                      <option value="shell_command">Shell Command</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    @click="removeAction(index)"
                    class="inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <span class="sr-only">Remove action</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  @click="addAction"
                  class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Action
                </button>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="text-sm text-red-600">
              {{ error }}
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="goBack"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go Back
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {{ loading ? 'Creating...' : 'Create Workflow' }}
              </button>
            </div>
          </form>
        </div>
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

const form = reactive({
  name: '',
  description: '',
  triggerType: '',
  schedule: '',
  actions: []
});

const loading = ref(false);
const error = ref('');

const addAction = () => {
  form.actions.push({
    type: '',
    config: {}
  });
};

const removeAction = (index) => {
  form.actions.splice(index, 1);
};

const goBack = () => {
  router.push('/dashboard');
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = '';
    
    await workflowStore.createWorkflow(form);
    router.push('/dashboard');
  } catch (err) {
    error.value = err.message || 'Failed to create workflow';
  } finally {
    loading.value = false;
  }
};
</script> 