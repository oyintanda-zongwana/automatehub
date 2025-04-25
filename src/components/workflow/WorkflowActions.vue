<template>
  <div class="bg-white shadow-sm rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md">
    <div class="p-6">
      <div class="mb-6">
        <div class="flex items-center space-x-2">
          <svg class="h-6 w-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-900">Actions</h3>
        </div>
        <p class="mt-2 text-sm text-gray-500">Configure the actions to be executed when the workflow is triggered.</p>
      </div>

      <!-- Actions List -->
      <TransitionGroup 
        name="list" 
        tag="div" 
        class="space-y-6"
      >
        <div 
          v-for="(action, index) in actions" 
          :key="index" 
          class="relative bg-gray-50 rounded-lg p-6 border border-gray-200 transition-all duration-200 hover:border-indigo-200 hover:bg-gray-50/80"
        >
          <!-- Action Header -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <div class="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-600">
                {{ index + 1 }}
              </div>
              <h4 class="text-lg font-medium text-gray-900">Action {{ index + 1 }}</h4>
            </div>
            
            <!-- Remove Action Button -->
            <button
              type="button"
              @click="removeAction(index)"
              class="group p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
            >
              <span class="sr-only">Remove action</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Action Type -->
            <div class="col-span-full md:col-span-1">
              <label :for="'actionType-' + index" class="block text-sm font-medium text-gray-700">Action Type</label>
              <div class="mt-1 relative">
                <select
                  :id="'actionType-' + index"
                  v-model="action.type"
                  class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                >
                  <option value="http">HTTP Request</option>
                  <option value="email">Send Email</option>
                  <option value="ai">AI Task</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- HTTP Configuration -->
            <Transition name="fade">
              <template v-if="action.type === 'http'">
                <div class="col-span-full md:col-span-1">
                  <label :for="'method-' + index" class="block text-sm font-medium text-gray-700">Method</label>
                  <div class="mt-1 relative">
                    <select
                      :id="'method-' + index"
                      v-model="action.config.method"
                      class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="col-span-full">
                  <label :for="'url-' + index" class="block text-sm font-medium text-gray-700">URL</label>
                  <div class="mt-1">
                    <input
                      type="url"
                      :id="'url-' + index"
                      v-model="action.config.url"
                      placeholder="https://api.example.com/endpoint"
                      class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div class="col-span-full">
                  <label :for="'body-' + index" class="block text-sm font-medium text-gray-700">Request Body</label>
                  <div class="mt-1">
                    <textarea
                      :id="'body-' + index"
                      v-model="action.config.body"
                      rows="4"
                      placeholder="{ &#34;key&#34;: &#34;value&#34; }"
                      class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 font-mono"
                    ></textarea>
                    <p class="mt-1 text-xs text-gray-500">Enter JSON format data</p>
                  </div>
                </div>
              </template>
            </Transition>

            <!-- Email Configuration -->
            <Transition name="fade">
              <template v-if="action.type === 'email'">
                <div class="col-span-full">
                  <label :for="'to-' + index" class="block text-sm font-medium text-gray-700">To</label>
                  <div class="mt-1">
                    <input
                      type="email"
                      :id="'to-' + index"
                      v-model="action.config.to"
                      placeholder="recipient@example.com"
                      class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div class="col-span-full">
                  <label :for="'subject-' + index" class="block text-sm font-medium text-gray-700">Subject</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      :id="'subject-' + index"
                      v-model="action.config.subject"
                      placeholder="Email subject"
                      class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div class="col-span-full">
                  <label :for="'body-' + index" class="block text-sm font-medium text-gray-700">Email Body</label>
                  <div class="mt-1">
                    <textarea
                      :id="'body-' + index"
                      v-model="action.config.body"
                      rows="4"
                      placeholder="Enter your email content here..."
                      class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                      required
                    ></textarea>
                    <p class="mt-1 text-xs text-gray-500">Supports markdown formatting</p>
                  </div>
                </div>
              </template>
            </Transition>

            <!-- AI Configuration -->
            <Transition name="fade">
              <template v-if="action.type === 'ai'">
                <div class="col-span-full md:col-span-1">
                  <label :for="'model-' + index" class="block text-sm font-medium text-gray-700">AI Model</label>
                  <div class="mt-1 relative">
                    <select
                      :id="'model-' + index"
                      v-model="action.config.model"
                      class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    >
                      <option value="gpt-4">GPT-4</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="col-span-full">
                  <label :for="'prompt-' + index" class="block text-sm font-medium text-gray-700">Prompt</label>
                  <div class="mt-1">
                    <textarea
                      :id="'prompt-' + index"
                      v-model="action.config.prompt"
                      rows="4"
                      placeholder="Enter your AI prompt here..."
                      class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                      required
                    ></textarea>
                    <p class="mt-1 text-xs text-gray-500">Use clear, specific instructions for best results</p>
                  </div>
                </div>
              </template>
            </Transition>
          </div>
        </div>
      </TransitionGroup>

      <!-- Add Action Button -->
      <div class="flex justify-center mt-8">
        <button
          type="button"
          @click="addAction"
          class="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
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

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}
</style> 