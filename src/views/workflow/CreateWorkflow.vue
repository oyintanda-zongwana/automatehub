<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">Create Workflow</h1>
      <p class="mt-2 text-lg text-gray-600">Set up a new automated workflow.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Error Alert -->
      <div v-if="error" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error creating workflow</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ error }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Basic Details -->
      <div class="bg-white shadow-sm rounded-lg overflow-hidden">
        <div class="p-6">
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Basic Details</h3>
            <p class="mt-1 text-sm text-gray-500">Provide the basic details for your workflow.</p>
          </div>

          <div class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  placeholder="Enter workflow name"
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                  required
                />
              </div>
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <div class="mt-1">
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="4"
                  placeholder="Describe what this workflow does..."
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trigger Configuration -->
      <div class="bg-white shadow-sm rounded-lg overflow-hidden">
        <div class="p-6">
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Trigger</h3>
            <p class="mt-1 text-sm text-gray-500">Define when this workflow should be triggered.</p>
          </div>

          <div class="space-y-6">
            <div>
              <label for="triggerType" class="block text-sm font-medium text-gray-700">Trigger Type</label>
              <div class="mt-1">
                <select
                  id="triggerType"
                  v-model="form.trigger.type"
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                >
                  <option value="schedule">Schedule</option>
                  <option value="webhook">Webhook</option>
                  <option value="event">Event</option>
                </select>
              </div>
            </div>

            <!-- Schedule Configuration -->
            <div v-if="form.trigger.type === 'schedule'" class="space-y-6">
              <div>
                <label for="schedule" class="block text-sm font-medium text-gray-700">Schedule</label>
                <div class="mt-1">
                  <input
                    type="text"
                    id="schedule"
                    v-model="form.trigger.config.schedule"
                    placeholder="*/5 * * * *"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                  />
                </div>
                <p class="mt-2 text-sm text-gray-500">Enter a cron expression (e.g., "*/5 * * * *" for every 5 minutes)</p>
              </div>
            </div>

            <!-- Webhook Configuration -->
            <div v-if="form.trigger.type === 'webhook'" class="space-y-6">
              <div>
                <label for="method" class="block text-sm font-medium text-gray-700">HTTP Method</label>
                <div class="mt-1">
                  <select
                    id="method"
                    v-model="form.trigger.config.method"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                  >
                    <option value="POST">POST</option>
                    <option value="GET">GET</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Event Configuration -->
            <div v-if="form.trigger.type === 'event'" class="space-y-6">
              <div>
                <label for="eventType" class="block text-sm font-medium text-gray-700">Event Type</label>
                <div class="mt-1">
                  <input
                    type="text"
                    id="eventType"
                    v-model="form.trigger.config.eventType"
                    placeholder="user.created"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                  />
                </div>
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

      <!-- Form Actions -->
      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="$router.push('/workflows')"
          class="px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Workflow
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useWorkflowStore } from '../../stores/workflow';
import WorkflowActions from '@/components/workflow/WorkflowActions.vue';

export default {
  name: 'CreateWorkflow',
  components: {
    WorkflowActions
  },
  setup() {
    const router = useRouter();
    const workflowStore = useWorkflowStore();
    const loading = ref(false);
    const error = ref(null);

    const form = ref({
      name: '',
      description: '',
      trigger: {
        type: 'schedule',
        config: {
          schedule: '*/5 * * * *',
          method: 'POST',
          eventType: ''
        }
      },
      actions: []
    });

    const addAction = () => {
      form.value.actions.push({
        type: 'http',
        config: {
          method: 'GET',
          url: '',
          body: ''
        }
      });
    };

    const removeAction = (index) => {
      form.value.actions.splice(index, 1);
    };

    const handleSubmit = async () => {
      try {
        loading.value = true;
        error.value = null;
        await workflowStore.createWorkflow(form.value);
        router.push('/workflows');
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      loading,
      error,
      addAction,
      removeAction,
      handleSubmit
    };
  }
};
</script> 