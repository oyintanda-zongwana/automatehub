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
                  <option v-for="actionType in allowedActions" :key="actionType.value" :value="actionType.value">
                    {{ actionType.label }}
                  </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Action Configuration -->
            <div class="col-span-full">
              <Transition name="fade" mode="out-in">
                <!-- HTTP Action -->
                <div v-if="action.type === 'http'" class="space-y-4">
                  <div>
                    <label :for="'httpMethod-' + index" class="block text-sm font-medium text-gray-700">Method</label>
                    <select
                      :id="'httpMethod-' + index"
                      v-model="action.config.method"
                      class="mt-1 block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                      <option value="PATCH">PATCH</option>
                    </select>
                  </div>
                  <div>
                    <label :for="'httpUrl-' + index" class="block text-sm font-medium text-gray-700">URL</label>
                    <input
                      type="url"
                      :id="'httpUrl-' + index"
                      v-model="action.config.url"
                      placeholder="https://api.example.com/endpoint"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label :for="'httpBody-' + index" class="block text-sm font-medium text-gray-700">Request Body</label>
                    <textarea
                      :id="'httpBody-' + index"
                      v-model="action.config.body"
                      rows="4"
                      placeholder="Enter request body (JSON)"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 font-mono"
                    ></textarea>
                  </div>
                </div>

                <!-- Email Action -->
                <div v-else-if="action.type === 'email'" class="space-y-4">
                  <div>
                    <label :for="'emailTo-' + index" class="block text-sm font-medium text-gray-700">To</label>
                    <input
                      type="email"
                      :id="'emailTo-' + index"
                      v-model="action.config.to"
                      placeholder="recipient@example.com"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label :for="'emailSubject-' + index" class="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                      type="text"
                      :id="'emailSubject-' + index"
                      v-model="action.config.subject"
                      placeholder="Email subject"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label :for="'emailBody-' + index" class="block text-sm font-medium text-gray-700">Body</label>
                    <textarea
                      :id="'emailBody-' + index"
                      v-model="action.config.body"
                      rows="4"
                      placeholder="Enter email body"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    ></textarea>
                  </div>
                </div>

                <!-- AI Action -->
                <div v-else-if="action.type === 'ai'" class="space-y-4">
                  <div>
                    <label :for="'aiTask-' + index" class="block text-sm font-medium text-gray-700">Task Type</label>
                    <select
                      :id="'aiTask-' + index"
                      v-model="action.config.task"
                      class="mt-1 block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    >
                      <option value="summarize">Summarize Text</option>
                      <option value="translate">Translate Text</option>
                      <option value="classify">Classify Content</option>
                      <option value="extract">Extract Information</option>
                    </select>
                  </div>

                  <!-- Task-specific configuration -->
                  <div v-if="action.config.task === 'translate'">
                    <label :for="'targetLanguage-' + index" class="block text-sm font-medium text-gray-700">Target Language</label>
                    <input
                      type="text"
                      :id="'targetLanguage-' + index"
                      v-model="action.config.targetLanguage"
                      placeholder="e.g., Spanish, French, German"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>

                  <div v-if="action.config.task === 'classify'">
                    <label :for="'categories-' + index" class="block text-sm font-medium text-gray-700">Categories (comma-separated)</label>
                    <input
                      type="text"
                      :id="'categories-' + index"
                      v-model="action.config.categories"
                      placeholder="e.g., Positive, Negative, Neutral"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>

                  <div v-if="action.config.task === 'extract'">
                    <label :for="'fields-' + index" class="block text-sm font-medium text-gray-700">Fields to Extract (comma-separated)</label>
                    <input
                      type="text"
                      :id="'fields-' + index"
                      v-model="action.config.fields"
                      placeholder="e.g., name, email, phone"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label :for="'aiInput-' + index" class="block text-sm font-medium text-gray-700">Input</label>
                    <textarea
                      :id="'aiInput-' + index"
                      v-model="action.config.input"
                      rows="4"
                      placeholder="Enter text to process"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    ></textarea>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Add Action Button -->
      <div class="mt-6">
        <button
          type="button"
          @click="addAction"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Action
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { aiService } from '../../services/aiService';

export default {
  name: 'WorkflowActions',
  props: {
    actions: {
      type: Array,
      required: true
    },
    triggerType: {
      type: String,
      required: true
    }
  },
  methods: {
    async executeAIAction(action) {
      try {
        let result;
        switch (action.config.task) {
          case 'summarize':
            result = await aiService.summarizeText(action.config.input);
            break;
          case 'translate':
            result = await aiService.translateText(action.config.input, action.config.targetLanguage);
            break;
          case 'classify':
            result = await aiService.classifyContent(action.config.input, action.config.categories);
            break;
          case 'extract':
            result = await aiService.extractInformation(action.config.input, action.config.fields);
            break;
          default:
            throw new Error(`Unknown AI task: ${action.config.task}`);
        }
        return result.choices[0].message.content;
      } catch (error) {
        console.error('AI action failed:', error);
        throw error;
      }
    },
    addAction() {
      const newAction = {
        type: 'http',
        config: {
          method: 'GET',
          url: '',
          body: ''
        }
      };

      // Initialize AI action if selected
      if (this.triggerType === 'ai') {
        newAction.type = 'ai';
        newAction.config = {
          task: 'summarize',
          input: '',
          targetLanguage: '',
          categories: '',
          fields: ''
        };
      }

      this.$emit('update:actions', [...this.actions, newAction]);
    },
    removeAction(index) {
      const updatedActions = [...this.actions];
      updatedActions.splice(index, 1);
      this.$emit('update:actions', updatedActions);
    }
  },
  computed: {
    allowedActions() {
      // Define allowed actions for each trigger type
      const actionMap = {
        // Time-based triggers
        schedule: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' },
          { value: 'ai', label: 'AI Task' }
        ],
        interval: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' },
          { value: 'ai', label: 'AI Task' }
        ],
        calendar: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' },
          { value: 'ai', label: 'AI Task' }
        ],
        // File & Document triggers
        file: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' },
          { value: 'ai', label: 'AI Task' }
        ],
        database: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' }
        ],
        pdf: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' },
          { value: 'ai', label: 'AI Task' }
        ],
        image: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' },
          { value: 'ai', label: 'AI Task' }
        ],
        // Communication triggers
        email: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' },
          { value: 'ai', label: 'AI Task' }
        ],
        webhook: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' }
        ],
        api: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' }
        ],
        event: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' }
        ],
        // Integration triggers
        github: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' }
        ],
        slack: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' }
        ],
        jira: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' }
        ],
        trello: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' }
        ],
        // Business triggers
        salesforce: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' }
        ],
        shopify: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' }
        ],
        stripe: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' }
        ],
        zapier: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' }
        ],
        // Other triggers
        manual: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' },
          { value: 'ai', label: 'AI Task' }
        ],
        condition: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' }
        ],
        error: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' }
        ],
        custom: [
          { value: 'http', label: 'HTTP Request' },
          { value: 'email', label: 'Send Email' }
        ]
      };

      return actionMap[this.triggerType] || [];
    }
  },
  watch: {
    'actions': {
      deep: true,
      handler(newActions) {
        this.$emit('update:actions', newActions);
      }
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