<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center space-x-3">
        <router-link 
          to="/workflows"
          class="text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </router-link>
        <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">Create Workflow</h1>
      </div>
      <p class="mt-2 text-lg text-gray-600">Set up a new automated workflow in just a few steps.</p>
    </div>

    <!-- Template Selection -->
    <div class="mb-8">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Choose a Template</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          v-for="template in templates"
          :key="template.id"
          @click="selectTemplate(template)"
          class="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all duration-200 text-left"
        >
          <h4 class="font-medium text-gray-900">{{ template.name }}</h4>
          <p class="text-sm text-gray-500 mt-1">{{ template.description }}</p>
        </button>
      </div>
    </div>

    <!-- Progress Steps -->
    <div class="mb-8">
      <div class="flex justify-between">
        <div 
          v-for="(step, index) in steps" 
          :key="step.name"
          class="flex items-center"
          :class="[
            index !== steps.length - 1 ? 'flex-1' : '',
            index !== 0 ? 'pl-6' : ''
          ]"
        >
          <div class="flex items-center relative">
            <div 
              class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 flex items-center justify-center"
              :class="[
                currentStep >= index
                  ? 'bg-indigo-600 border-indigo-600'
                  : 'border-gray-300'
              ]"
            >
              <span 
                class="text-lg font-bold"
                :class="currentStep >= index ? 'text-white' : 'text-gray-500'"
              >
                {{ index + 1 }}
              </span>
            </div>
            <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-sm font-medium">
              <span 
                class="transition duration-500"
                :class="currentStep >= index ? 'text-indigo-600' : 'text-gray-500'"
              >
                {{ step.name }}
              </span>
            </div>
          </div>
          <div 
            v-if="index !== steps.length - 1"
            class="flex-auto border-t-2 transition duration-500 ease-in-out"
            :class="currentStep > index ? 'border-indigo-600' : 'border-gray-300'"
          ></div>
        </div>
      </div>
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
      <Transition name="fade" mode="out-in">
        <div v-if="currentStep === 0" class="bg-white shadow-sm rounded-lg overflow-hidden">
          <div class="p-6">
            <div class="mb-6">
              <div class="flex items-center space-x-2">
                <svg class="h-6 w-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <h3 class="text-xl font-semibold text-gray-900">Basic Details</h3>
              </div>
              <p class="mt-2 text-sm text-gray-500">Provide the basic details for your workflow.</p>
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
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
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
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Trigger Configuration -->
        <div v-else-if="currentStep === 1" class="bg-white shadow-sm rounded-lg overflow-hidden">
          <div class="p-6">
            <div class="mb-6">
              <div class="flex items-center space-x-2">
                <svg class="h-6 w-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="text-xl font-semibold text-gray-900">Trigger</h3>
              </div>
              <p class="mt-2 text-sm text-gray-500">Define when this workflow should be triggered.</p>
            </div>

            <div class="space-y-6">
              <div>
                <label for="triggerType" class="block text-sm font-medium text-gray-700">Trigger Type</label>
                <div class="mt-1 relative">
                  <select
                    id="triggerType"
                    v-model="form.trigger.type"
                    class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  >
                    <optgroup label="Basic Triggers">
                      <option value="schedule">Schedule</option>
                      <option value="webhook">Webhook</option>
                      <option value="event">Event</option>
                      <option value="interval">Interval</option>
                      <option value="api">API</option>
                      <option value="manual">Manual</option>
                    </optgroup>

                    <optgroup label="File & Document Triggers">
                      <option value="file">File</option>
                      <option value="database">Database</option>
                      <option value="pdf">PDF</option>
                      <option value="image">Image</option>
                      <option value="document">Document</option>
                    </optgroup>

                    <optgroup label="Communication Triggers">
                      <option value="email">Email</option>
                      <option value="slack">Slack</option>
                      <option value="discord">Discord</option>
                      <option value="telegram">Telegram</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="sms">SMS</option>
                      <option value="voice">Voice Call</option>
                    </optgroup>

                    <optgroup label="Productivity Tools">
                      <option value="github">GitHub</option>
                      <option value="jira">Jira</option>
                      <option value="trello">Trello</option>
                      <option value="asana">Asana</option>
                      <option value="notion">Notion</option>
                      <option value="airtable">Airtable</option>
                    </optgroup>

                    <optgroup label="Business Tools">
                      <option value="salesforce">Salesforce</option>
                      <option value="hubspot">HubSpot</option>
                      <option value="zoho">Zoho</option>
                      <option value="quickbooks">QuickBooks</option>
                      <option value="xero">Xero</option>
                    </optgroup>

                    <optgroup label="E-commerce">
                      <option value="shopify">Shopify</option>
                      <option value="woocommerce">WooCommerce</option>
                      <option value="magento">Magento</option>
                      <option value="bigcommerce">BigCommerce</option>
                    </optgroup>

                    <optgroup label="Payment Processing">
                      <option value="stripe">Stripe</option>
                      <option value="paypal">PayPal</option>
                      <option value="square">Square</option>
                    </optgroup>

                    <optgroup label="Marketing">
                      <option value="mailchimp">Mailchimp</option>
                      <option value="sendgrid">SendGrid</option>
                      <option value="hubspot">HubSpot</option>
                    </optgroup>

                    <optgroup label="Communication Platforms">
                      <option value="zoom">Zoom</option>
                      <option value="teams">Microsoft Teams</option>
                      <option value="meet">Google Meet</option>
                      <option value="webex">Webex</option>
                    </optgroup>

                    <optgroup label="Social Media">
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="twitter">Twitter</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="youtube">YouTube</option>
                    </optgroup>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Schedule Configuration -->
              <Transition name="fade" mode="out-in">
                <div v-if="form.trigger.type === 'schedule'" class="space-y-6">
                  <div>
                    <label for="schedule" class="block text-sm font-medium text-gray-700">Schedule</label>
                    <div class="mt-1">
                      <input
                        type="text"
                        id="schedule"
                        v-model="form.trigger.config.schedule"
                        placeholder="*/5 * * * *"
                        class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 font-mono"
                      />
                    </div>
                    <p class="mt-2 text-sm text-gray-500">Enter a cron expression (e.g., "*/5 * * * *" for every 5 minutes)</p>
                  </div>
                </div>

                <!-- Webhook Configuration -->
                <div v-else-if="form.trigger.type === 'webhook'" class="space-y-6">
                  <div>
                    <label for="method" class="block text-sm font-medium text-gray-700">HTTP Method</label>
                    <div class="mt-1 relative">
                      <select
                        id="method"
                        v-model="form.trigger.config.method"
                        class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                      >
                        <option value="POST">POST</option>
                        <option value="GET">GET</option>
                      </select>
                      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Event Configuration -->
                <div v-else-if="form.trigger.type === 'event'" class="space-y-6">
                  <div>
                    <label for="eventType" class="block text-sm font-medium text-gray-700">Event Type</label>
                    <div class="mt-1">
                      <input
                        type="text"
                        id="eventType"
                        v-model="form.trigger.config.eventType"
                        placeholder="user.created"
                        class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- Actions Configuration -->
        <div v-else-if="currentStep === 2">
          <WorkflowActions
            :actions="form.actions"
            @add-action="addAction"
            @remove-action="removeAction"
          />
        </div>
      </Transition>

      <!-- Navigation Buttons -->
      <div class="flex justify-between space-x-4">
        <button
          type="button"
          v-if="currentStep > 0"
          @click="currentStep--"
          class="px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
        >
          Previous
        </button>
        <div class="flex-1"></div>
        <div class="flex space-x-4">
          <button
            type="button"
            @click="$router.push('/workflows')"
            class="px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            v-if="currentStep < steps.length - 1"
            type="button"
            @click="currentStep++"
            class="px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
          >
            Next
          </button>
          <button
            v-else
            type="submit"
            :disabled="loading"
            class="px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>Create Workflow</span>
            <svg 
              v-if="loading"
              class="animate-spin h-5 w-5 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </div>
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
    const currentStep = ref(0);

    const templates = [
      {
        id: 'auto-translation',
        name: 'Auto Document Translation',
        description: 'Automatically translate documents between multiple languages',
        trigger: {
          type: 'file',
          config: {
            fileEvent: 'created',
            filePath: ''
          }
        },
        actions: [
          {
            type: 'http',
            config: {
              method: 'POST',
              url: 'https://api.translation.service/translate',
              body: '{"source": "{{file.content}}", "target_language": "en"}'
            }
          }
        ]
      },
      {
        id: 'email-summarizer',
        name: 'Email Summarizer',
        description: 'Generate concise summaries of incoming emails',
        trigger: {
          type: 'email',
          config: {
            emailAddress: '',
            emailFilter: ''
          }
        },
        actions: [
          {
            type: 'http',
            config: {
              method: 'POST',
              url: 'https://api.summarization.service/summarize',
              body: '{"text": "{{email.content}}"}'
            }
          }
        ]
      },
      {
        id: 'daily-planner',
        name: 'Daily Planner Generator',
        description: 'Create daily task plans based on calendar events',
        trigger: {
          type: 'schedule',
          config: {
            schedule: '0 0 * * *'
          }
        },
        actions: [
          {
            type: 'http',
            config: {
              method: 'POST',
              url: 'https://api.planner.service/generate',
              body: '{"date": "{{current_date}}"}'
            }
          }
        ]
      },
      {
        id: 'content-calendar',
        name: 'Content Calendar Generator',
        description: 'Generate social media content calendar',
        trigger: {
          type: 'schedule',
          config: {
            schedule: '0 0 1 * *'
          }
        },
        actions: [
          {
            type: 'http',
            config: {
              method: 'POST',
              url: 'https://api.content.service/calendar',
              body: '{"month": "{{next_month}}"}'
            }
          }
        ]
      },
      {
        id: 'sentiment-analysis',
        name: 'Sentiment Analysis',
        description: 'Analyze sentiment of social media posts',
        trigger: {
          type: 'api',
          config: {
            endpoint: 'https://api.social.service/feed',
            checkInterval: 5
          }
        },
        actions: [
          {
            type: 'http',
            config: {
              method: 'POST',
              url: 'https://api.sentiment.service/analyze',
              body: '{"text": "{{post.content}}"}'
            }
          }
        ]
      },
      {
        id: 'contract-reviewer',
        name: 'Contract Reviewer',
        description: 'Review and analyze legal contracts',
        trigger: {
          type: 'file',
          config: {
            fileEvent: 'created',
            filePath: ''
          }
        },
        actions: [
          {
            type: 'http',
            config: {
              method: 'POST',
              url: 'https://api.legal.service/review',
              body: '{"document": "{{file.content}}"}'
            }
          }
        ]
      },
      {
        id: 'seo-scorer',
        name: 'Blog SEO Score Generator',
        description: 'Generate SEO scores for blog posts',
        trigger: {
          type: 'file',
          config: {
            fileEvent: 'created',
            filePath: ''
          }
        },
        actions: [
          {
            type: 'http',
            config: {
              method: 'POST',
              url: 'https://api.seo.service/analyze',
              body: '{"content": "{{file.content}}"}'
            }
          }
        ]
      },
      {
        id: 'pdf-extractor',
        name: 'PDF Content Extractor',
        description: 'Extract and process content from PDF files',
        trigger: {
          type: 'file',
          config: {
            fileEvent: 'created',
            filePath: ''
          }
        },
        actions: [
          {
            type: 'http',
            config: {
              method: 'POST',
              url: 'https://api.pdf.service/extract',
              body: '{"file": "{{file.path}}"}'
            }
          }
        ]
      },
      {
        id: 'ocr-processor',
        name: 'OCR from Images',
        description: 'Extract text from images using OCR',
        trigger: {
          type: 'file',
          config: {
            fileEvent: 'created',
            filePath: ''
          }
        },
        actions: [
          {
            type: 'http',
            config: {
              method: 'POST',
              url: 'https://api.ocr.service/process',
              body: '{"image": "{{file.path}}"}'
            }
          }
        ]
      },
      {
        id: 'ticket-tagger',
        name: 'Multi-language Support Ticket Tagger',
        description: 'Automatically tag support tickets in multiple languages',
        trigger: {
          type: 'api',
          config: {
            endpoint: 'https://api.support.service/tickets',
            checkInterval: 1
          }
        },
        actions: [
          {
            type: 'http',
            config: {
              method: 'POST',
              url: 'https://api.nlp.service/tag',
              body: '{"text": "{{ticket.content}}", "language": "{{ticket.language}}"}'
            }
          }
        ]
      }
    ];

    const selectTemplate = (template) => {
      form.value = {
        name: template.name,
        description: template.description,
        trigger: { ...template.trigger },
        actions: template.actions.map(action => ({ ...action }))
      };
    };

    const steps = [
      { name: 'Basic Details' },
      { name: 'Trigger' },
      { name: 'Actions' }
    ];

    const form = ref({
      name: '',
      description: '',
      trigger: {
        type: 'schedule',
        config: {
          schedule: '*/5 * * * *',
          method: 'POST',
          eventType: '',
          customEventType: '',
          path: '',
          interval: 5,
          unit: 'minutes',
          endpoint: '',
          checkInterval: 5,
          dbType: 'mysql',
          query: '',
          filePath: '',
          fileEvent: 'created',
          emailAddress: '',
          emailFilter: '',
          slackEvent: 'message',
          slackChannel: '',
          githubEvent: 'push',
          githubRepo: '',
          jiraEvent: 'issue_created',
          jiraProject: ''
        }
      },
      actions: []
    });

    const addAction = () => {
      form.value.actions.push({
        type: 'http',
        config: {
          method: 'POST',
          url: '',
          body: '',
          to: '',
          subject: '',
          channel: '',
          message: '',
          operation: 'query',
          query: '',
          path: '',
          content: '',
          action: 'create_issue',
          repo: '',
          project: '',
          language: 'javascript',
          code: ''
        }
      });
    };

    const removeAction = (index) => {
      form.value.actions.splice(index, 1);
    };

    const handleSubmit = async () => {
      try {
        loading.value = true;
        // Validate form
        if (!form.value.name) {
          throw new Error('Workflow name is required');
        }

        // Prepare workflow data
        const workflowData = {
          name: form.value.name,
          description: form.value.description,
          trigger: {
            type: form.value.trigger.type,
            config: { ...form.value.trigger.config }
          },
          actions: form.value.actions.map(action => ({
            type: action.type,
            config: { ...action.config }
          }))
        };

        // Create workflow using the store
        await workflowStore.createWorkflow(workflowData);

        // Redirect to workflows list
        router.push('/workflows');
      } catch (error) {
        console.error('Error creating workflow:', error);
        // Handle error (show notification, etc.)
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      loading,
      error,
      currentStep,
      steps,
      templates,
      selectTemplate,
      addAction,
      removeAction,
      handleSubmit
    };
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 