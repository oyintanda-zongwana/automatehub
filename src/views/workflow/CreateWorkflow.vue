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
                    <optgroup label="Time-based Triggers">
                      <option value="schedule">Schedule (Cron)</option>
                      <option value="interval">Interval</option>
                      <option value="calendar">Calendar Event</option>
                    </optgroup>

                    <optgroup label="File & Document Triggers">
                      <option value="file">File Change</option>
                      <option value="database">Database Change</option>
                      <option value="pdf">PDF Document</option>
                      <option value="image">Image File</option>
                    </optgroup>

                    <optgroup label="Communication Triggers">
                      <option value="email">Email</option>
                      <option value="webhook">Webhook</option>
                      <option value="api">API Call</option>
                      <option value="event">System Event</option>
                    </optgroup>

                    <optgroup label="Integration Triggers">
                      <option value="github">GitHub</option>
                      <option value="slack">Slack</option>
                      <option value="jira">Jira</option>
                      <option value="trello">Trello</option>
                    </optgroup>

                    <optgroup label="Business Triggers">
                      <option value="salesforce">Salesforce</option>
                      <option value="shopify">Shopify</option>
                      <option value="stripe">Stripe</option>
                      <option value="zapier">Zapier</option>
                    </optgroup>

                    <optgroup label="Other Triggers">
                      <option value="manual">Manual Trigger</option>
                      <option value="condition">Conditional</option>
                      <option value="error">Error Event</option>
                      <option value="custom">Custom Trigger</option>
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

                <!-- Email Configuration -->
                <div v-else-if="form.trigger.type === 'email'" class="space-y-6">
                  <div>
                    <label for="emailProvider" class="block text-sm font-medium text-gray-700">Email Provider</label>
                    <div class="mt-1">
                      <select
                        id="emailProvider"
                        v-model="form.trigger.config.provider"
                        class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                      >
                        <option value="gmail">Gmail</option>
                        <option value="outlook">Outlook</option>
                        <option value="yahoo">Yahoo</option>
                        <option value="custom">Custom IMAP/SMTP</option>
                      </select>
                    </div>
                  </div>

                  <div v-if="form.trigger.config.provider === 'custom'">
                    <div class="space-y-4">
                      <div>
                        <label for="imapServer" class="block text-sm font-medium text-gray-700">IMAP Server</label>
                        <input
                          type="text"
                          id="imapServer"
                          v-model="form.trigger.config.imapServer"
                          placeholder="imap.example.com"
                          class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label for="smtpServer" class="block text-sm font-medium text-gray-700">SMTP Server</label>
                        <input
                          type="text"
                          id="smtpServer"
                          v-model="form.trigger.config.smtpServer"
                          placeholder="smtp.example.com"
                          class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label for="emailAddress" class="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      id="emailAddress"
                      v-model="form.trigger.config.emailAddress"
                      placeholder="your@email.com"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label for="emailPassword" class="block text-sm font-medium text-gray-700">Password/App Password</label>
                    <input
                      type="password"
                      id="emailPassword"
                      v-model="form.trigger.config.emailPassword"
                      placeholder="Enter your password or app password"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                    <p class="mt-2 text-sm text-gray-500">For Gmail, use an App Password. For other providers, use your regular password.</p>
                  </div>

                  <div>
                    <label for="emailFilter" class="block text-sm font-medium text-gray-700">Email Filter</label>
                    <input
                      type="text"
                      id="emailFilter"
                      v-model="form.trigger.config.emailFilter"
                      placeholder="subject:Important from:someone@example.com"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                    <p class="mt-2 text-sm text-gray-500">Filter emails by subject, sender, or other criteria</p>
                  </div>
                </div>

                <!-- GitHub Configuration -->
                <div v-else-if="form.trigger.type === 'github'" class="space-y-6">
                  <div>
                    <label for="githubToken" class="block text-sm font-medium text-gray-700">GitHub Personal Access Token</label>
                    <input
                      type="password"
                      id="githubToken"
                      v-model="form.trigger.config.githubToken"
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                    <p class="mt-2 text-sm text-gray-500">Create a token with repo and workflow scopes at GitHub Settings > Developer Settings > Personal Access Tokens</p>
                  </div>

                  <div>
                    <label for="githubRepo" class="block text-sm font-medium text-gray-700">Repository</label>
                    <input
                      type="text"
                      id="githubRepo"
                      v-model="form.trigger.config.githubRepo"
                      placeholder="owner/repo"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label for="githubEvent" class="block text-sm font-medium text-gray-700">Event Type</label>
                    <select
                      id="githubEvent"
                      v-model="form.trigger.config.githubEvent"
                      class="mt-1 block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    >
                      <option value="push">Push</option>
                      <option value="pull_request">Pull Request</option>
                      <option value="issues">Issues</option>
                      <option value="release">Release</option>
                    </select>
                  </div>
                </div>

                <!-- Slack Configuration -->
                <div v-else-if="form.trigger.type === 'slack'" class="space-y-6">
                  <div>
                    <label for="slackToken" class="block text-sm font-medium text-gray-700">Slack Bot Token</label>
                    <input
                      type="password"
                      id="slackToken"
                      v-model="form.trigger.config.slackToken"
                      placeholder="xoxb-xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                    <p class="mt-2 text-sm text-gray-500">Create a bot token at api.slack.com/apps > Your App > OAuth & Permissions</p>
                  </div>

                  <div>
                    <label for="slackChannel" class="block text-sm font-medium text-gray-700">Channel</label>
                    <input
                      type="text"
                      id="slackChannel"
                      v-model="form.trigger.config.slackChannel"
                      placeholder="#general"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label for="slackEvent" class="block text-sm font-medium text-gray-700">Event Type</label>
                    <select
                      id="slackEvent"
                      v-model="form.trigger.config.slackEvent"
                      class="mt-1 block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    >
                      <option value="message">New Message</option>
                      <option value="reaction">Reaction Added</option>
                      <option value="mention">Mention</option>
                    </select>
                  </div>
                </div>

                <!-- Jira Configuration -->
                <div v-else-if="form.trigger.type === 'jira'" class="space-y-6">
                  <div>
                    <label for="jiraDomain" class="block text-sm font-medium text-gray-700">Jira Domain</label>
                    <input
                      type="text"
                      id="jiraDomain"
                      v-model="form.trigger.config.jiraDomain"
                      placeholder="your-domain.atlassian.net"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label for="jiraEmail" class="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="jiraEmail"
                      v-model="form.trigger.config.jiraEmail"
                      placeholder="your@email.com"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label for="jiraToken" class="block text-sm font-medium text-gray-700">API Token</label>
                    <input
                      type="password"
                      id="jiraToken"
                      v-model="form.trigger.config.jiraToken"
                      placeholder="Enter your Jira API token"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                    <p class="mt-2 text-sm text-gray-500">Create an API token at id.atlassian.com/manage-profile/security/api-tokens</p>
                  </div>

                  <div>
                    <label for="jiraProject" class="block text-sm font-medium text-gray-700">Project Key</label>
                    <input
                      type="text"
                      id="jiraProject"
                      v-model="form.trigger.config.jiraProject"
                      placeholder="PROJ"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>
                </div>

                <!-- Webhook Configuration -->
                <div v-else-if="form.trigger.type === 'webhook'" class="space-y-6">
                  <div>
                    <label for="webhookSecret" class="block text-sm font-medium text-gray-700">Webhook Secret</label>
                    <input
                      type="password"
                      id="webhookSecret"
                      v-model="form.trigger.config.webhookSecret"
                      placeholder="Enter a secret key for webhook verification"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                    <p class="mt-2 text-sm text-gray-500">This secret will be used to verify incoming webhook requests</p>
                  </div>

                  <div>
                    <label for="webhookPath" class="block text-sm font-medium text-gray-700">Webhook Path</label>
                    <input
                      type="text"
                      id="webhookPath"
                      v-model="form.trigger.config.webhookPath"
                      placeholder="/webhook/custom-endpoint"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>
                </div>

                <!-- API Configuration -->
                <div v-else-if="form.trigger.type === 'api'" class="space-y-6">
                  <div>
                    <label for="apiEndpoint" class="block text-sm font-medium text-gray-700">API Endpoint</label>
                    <input
                      type="url"
                      id="apiEndpoint"
                      v-model="form.trigger.config.apiEndpoint"
                      placeholder="https://api.example.com/endpoint"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label for="apiKey" class="block text-sm font-medium text-gray-700">API Key</label>
                    <input
                      type="password"
                      id="apiKey"
                      v-model="form.trigger.config.apiKey"
                      placeholder="Enter your API key"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label for="apiInterval" class="block text-sm font-medium text-gray-700">Check Interval (minutes)</label>
                    <input
                      type="number"
                      id="apiInterval"
                      v-model="form.trigger.config.apiInterval"
                      min="1"
                      class="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    />
                  </div>
                </div>
              </Transition>

              <!-- Connection Test Button -->
              <div v-if="form.trigger.type !== 'schedule' && form.trigger.type !== 'manual'" class="mt-6">
                <button
                  type="button"
                  @click="testConnection"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Test Connection
                </button>
                <p v-if="connectionStatus" class="mt-2 text-sm" :class="connectionStatus.success ? 'text-green-600' : 'text-red-600'">
                  {{ connectionStatus.message }}
                </p>
              </div>
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
    const connectionStatus = ref(null);

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

    const testConnection = async () => {
      try {
        loading.value = true;
        connectionStatus.value = null;

        // Test connection based on trigger type
        switch (form.value.trigger.type) {
          case 'email':
            await testEmailConnection();
            break;
          case 'github':
            await testGitHubConnection();
            break;
          case 'slack':
            await testSlackConnection();
            break;
          case 'jira':
            await testJiraConnection();
            break;
          case 'webhook':
            await testWebhookEndpoint();
            break;
          case 'api':
            await testApiEndpoint();
            break;
          default:
            throw new Error('Unsupported trigger type for connection testing');
        }

        connectionStatus.value = {
          success: true,
          message: 'Connection successful!'
        };
      } catch (error) {
        connectionStatus.value = {
          success: false,
          message: error.message
        };
      } finally {
        loading.value = false;
      }
    };

    // Connection test functions
    const testEmailConnection = async () => {
      const { provider, emailAddress, emailPassword, imapServer, smtpServer } = form.value.trigger.config;
      
      try {
        const response = await fetch('/api/test-email-connection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            provider,
            emailAddress,
            emailPassword,
            imapServer,
            smtpServer
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to connect to email server');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`Email connection failed: ${error.message}`);
      }
    };

    const testGitHubConnection = async () => {
      const { githubToken, githubRepo } = form.value.trigger.config;
      
      try {
        const response = await fetch('/api/test-github-connection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: githubToken,
            repo: githubRepo
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to connect to GitHub');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`GitHub connection failed: ${error.message}`);
      }
    };

    const testSlackConnection = async () => {
      const { slackToken, slackChannel } = form.value.trigger.config;
      
      try {
        const response = await fetch('/api/test-slack-connection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: slackToken,
            channel: slackChannel
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to connect to Slack');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`Slack connection failed: ${error.message}`);
      }
    };

    const testJiraConnection = async () => {
      const { jiraDomain, jiraEmail, jiraToken, jiraProject } = form.value.trigger.config;
      
      try {
        const response = await fetch('/api/test-jira-connection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            domain: jiraDomain,
            email: jiraEmail,
            token: jiraToken,
            project: jiraProject
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to connect to Jira');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`Jira connection failed: ${error.message}`);
      }
    };

    const testWebhookEndpoint = async () => {
      const { webhookSecret, webhookPath } = form.value.trigger.config;
      
      try {
        const response = await fetch('/api/test-webhook-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            secret: webhookSecret,
            path: webhookPath
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to test webhook endpoint');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`Webhook endpoint test failed: ${error.message}`);
      }
    };

    const testApiEndpoint = async () => {
      const { apiEndpoint, apiKey } = form.value.trigger.config;
      
      try {
        const response = await fetch('/api/test-api-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            endpoint: apiEndpoint,
            apiKey: apiKey
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to test API endpoint');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`API endpoint test failed: ${error.message}`);
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
      handleSubmit,
      connectionStatus,
      testConnection
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