<template>
  <div class="bg-white shadow-sm rounded-lg overflow-hidden">
    <div class="p-6">
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-gray-900">Actions</h3>
        <p class="mt-1 text-sm text-gray-500">Configure the actions to be executed when the workflow is triggered.</p>
      </div>

      <!-- Actions List -->
      <div class="space-y-6">
        <div v-for="(action, index) in actions" :key="index" class="relative bg-gray-50 rounded-lg p-6 border border-gray-200">
          <!-- Remove Action Button -->
          <button
            type="button"
            @click="removeAction(index)"
            class="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
          >
            <span class="sr-only">Remove action</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Action Type -->
            <div>
              <label :for="'actionType-' + index" class="block text-sm font-medium text-gray-700">Action Type</label>
              <div class="mt-1">
                <select
                  :id="'actionType-' + index"
                  v-model="action.type"
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                >
                  <option value="http">HTTP Request</option>
                  <option value="email">Send Email</option>
                  <option value="ai">AI Task</option>
                </select>
              </div>
            </div>

            <!-- HTTP Configuration -->
            <template v-if="action.type === 'http'">
              <div>
                <label :for="'method-' + index" class="block text-sm font-medium text-gray-700">Method</label>
                <div class="mt-1">
                  <select
                    :id="'method-' + index"
                    v-model="action.config.method"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>
              </div>

              <div class="md:col-span-2">
                <label :for="'url-' + index" class="block text-sm font-medium text-gray-700">URL</label>
                <div class="mt-1">
                  <input
                    type="url"
                    :id="'url-' + index"
                    v-model="action.config.url"
                    placeholder="https://api.example.com/endpoint"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                    required
                  />
                </div>
              </div>

              <div class="md:col-span-2">
                <label :for="'body-' + index" class="block text-sm font-medium text-gray-700">Request Body</label>
                <div class="mt-1">
                  <textarea
                    :id="'body-' + index"
                    v-model="action.config.body"
                    rows="4"
                    placeholder="{ &#34;key&#34;: &#34;value&#34; }"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                  ></textarea>
                </div>
              </div>
            </template>

            <!-- Email Configuration -->
            <template v-if="action.type === 'email'">
              <div class="md:col-span-2">
                <label :for="'to-' + index" class="block text-sm font-medium text-gray-700">To</label>
                <div class="mt-1">
                  <input
                    type="email"
                    :id="'to-' + index"
                    v-model="action.config.to"
                    placeholder="recipient@example.com"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                    required
                  />
                </div>
              </div>

              <div class="md:col-span-2">
                <label :for="'subject-' + index" class="block text-sm font-medium text-gray-700">Subject</label>
                <div class="mt-1">
                  <input
                    type="text"
                    :id="'subject-' + index"
                    v-model="action.config.subject"
                    placeholder="Email subject"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                    required
                  />
                </div>
              </div>

              <div class="md:col-span-2">
                <label :for="'body-' + index" class="block text-sm font-medium text-gray-700">Email Body</label>
                <div class="mt-1">
                  <textarea
                    :id="'body-' + index"
                    v-model="action.config.body"
                    rows="4"
                    placeholder="Enter your email content here..."
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                    required
                  ></textarea>
                </div>
              </div>
            </template>

            <!-- AI Configuration -->
            <template v-if="action.type === 'ai'">
              <div>
                <label :for="'model-' + index" class="block text-sm font-medium text-gray-700">AI Model</label>
                <div class="mt-1">
                  <select
                    :id="'model-' + index"
                    v-model="action.config.model"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                  >
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  </select>
                </div>
              </div>

              <div class="md:col-span-2">
                <label :for="'prompt-' + index" class="block text-sm font-medium text-gray-700">Prompt</label>
                <div class="mt-1">
                  <textarea
                    :id="'prompt-' + index"
                    v-model="action.config.prompt"
                    rows="4"
                    placeholder="Enter your AI prompt here..."
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                    required
                  ></textarea>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Add Action Button -->
      <div class="flex justify-center mt-6">
        <button
          type="button"
          @click="addAction"
          class="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <svg class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add Action
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkflowActions',
  props: {
    actions: {
      type: Array,
      required: true
    }
  },
  methods: {
    addAction() {
      this.$emit('add-action');
    },
    removeAction(index) {
      this.$emit('remove-action', index);
    }
  }
};
</script> 