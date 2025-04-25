<template>
  <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-8">Create Workflow</h1>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Basic Information -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Workflow Name</label>
        <div class="mt-1">
          <input
            type="text"
            id="name"
            v-model="form.name"
            required
            class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
          />
        </div>
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <div class="mt-1">
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
          ></textarea>
        </div>
      </div>

      <!-- Trigger Section -->
      <div>
        <h3 class="text-lg font-medium text-gray-900">Trigger</h3>
        <p class="mt-1 text-sm text-gray-500">Define what starts the workflow.</p>

        <div class="mt-4">
          <label for="triggerType" class="block text-sm font-medium text-gray-700">Trigger Type</label>
          <div class="mt-1">
            <select
              id="triggerType"
              v-model="form.trigger.type"
              class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
            >
              <option value="schedule">Schedule</option>
              <option value="webhook">Webhook</option>
              <option value="event">Event</option>
              <option value="interval">Interval</option>
              <option value="api">API</option>
              <option value="manual">Manual</option>
              <option value="database">Database</option>
              <option value="file">File</option>
              <option value="email">Email</option>
              <option value="slack">Slack</option>
              <option value="github">GitHub</option>
              <option value="jira">Jira</option>
            </select>
          </div>
        </div>

        <!-- Trigger Configurations -->
        <Transition name="fade" mode="out-in">
          <!-- Schedule Configuration -->
          <div v-if="form.trigger.type === 'schedule'" class="mt-4 space-y-4">
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
          <div v-else-if="form.trigger.type === 'webhook'" class="mt-4 space-y-4">
            <div>
              <label for="method" class="block text-sm font-medium text-gray-700">HTTP Method</label>
              <div class="mt-1">
                <select
                  id="method"
                  v-model="form.trigger.config.method"
                  class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                >
                  <option value="POST">POST</option>
                  <option value="GET">GET</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                </select>
              </div>
            </div>
            <div>
              <label for="webhookPath" class="block text-sm font-medium text-gray-700">Webhook Path</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="webhookPath"
                  v-model="form.trigger.config.path"
                  placeholder="/webhook/custom-endpoint"
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">Custom endpoint path for your webhook</p>
            </div>
          </div>

          <!-- Event Configuration -->
          <div v-else-if="form.trigger.type === 'event'" class="mt-4 space-y-4">
            <div>
              <label for="eventType" class="block text-sm font-medium text-gray-700">Event Type</label>
              <div class="mt-1">
                <select
                  id="eventType"
                  v-model="form.trigger.config.eventType"
                  class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                >
                  <option value="user.created">User Created</option>
                  <option value="user.updated">User Updated</option>
                  <option value="user.deleted">User Deleted</option>
                  <option value="data.updated">Data Updated</option>
                  <option value="system.alert">System Alert</option>
                  <option value="custom">Custom Event</option>
                </select>
              </div>
            </div>
            <div v-if="form.trigger.config.eventType === 'custom'">
              <label for="customEventType" class="block text-sm font-medium text-gray-700">Custom Event Name</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="customEventType"
                  v-model="form.trigger.config.customEventType"
                  placeholder="my.custom.event"
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <!-- Interval Configuration -->
          <div v-else-if="form.trigger.type === 'interval'" class="mt-4 space-y-4">
            <div>
              <label for="interval" class="block text-sm font-medium text-gray-700">Interval</label>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    id="interval"
                    v-model="form.trigger.config.interval"
                    min="1"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  />
                </div>
                <div>
                  <select
                    v-model="form.trigger.config.unit"
                    class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- API Configuration -->
          <div v-else-if="form.trigger.type === 'api'" class="mt-4 space-y-4">
            <div>
              <label for="apiEndpoint" class="block text-sm font-medium text-gray-700">API Endpoint</label>
              <div class="mt-1">
                <input
                  type="url"
                  id="apiEndpoint"
                  v-model="form.trigger.config.endpoint"
                  placeholder="https://api.example.com/data"
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label for="apiInterval" class="block text-sm font-medium text-gray-700">Check Interval (minutes)</label>
              <div class="mt-1">
                <input
                  type="number"
                  id="apiInterval"
                  v-model="form.trigger.config.checkInterval"
                  min="1"
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <!-- Database Configuration -->
          <div v-else-if="form.trigger.type === 'database'" class="mt-4 space-y-4">
            <div>
              <label for="dbType" class="block text-sm font-medium text-gray-700">Database Type</label>
              <div class="mt-1">
                <select
                  id="dbType"
                  v-model="form.trigger.config.dbType"
                  class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                >
                  <option value="mysql">MySQL</option>
                  <option value="postgresql">PostgreSQL</option>
                  <option value="mongodb">MongoDB</option>
                  <option value="sqlite">SQLite</option>
                </select>
              </div>
            </div>
            <div>
              <label for="dbQuery" class="block text-sm font-medium text-gray-700">Query</label>
              <div class="mt-1">
                <textarea
                  id="dbQuery"
                  v-model="form.trigger.config.query"
                  rows="4"
                  placeholder="SELECT * FROM table WHERE condition"
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 font-mono"
                ></textarea>
              </div>
            </div>
            <div>
              <label for="dbInterval" class="block text-sm font-medium text-gray-700">Check Interval (minutes)</label>
              <div class="mt-1">
                <input
                  type="number"
                  id="dbInterval"
                  v-model="form.trigger.config.checkInterval"
                  min="1"
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <!-- File Configuration -->
          <div v-else-if="form.trigger.type === 'file'" class="mt-4 space-y-4">
            <div>
              <label for="filePath" class="block text-sm font-medium text-gray-700">File Path</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="filePath"
                  v-model="form.trigger.config.filePath"
                  placeholder="/path/to/file"
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label for="fileEvent" class="block text-sm font-medium text-gray-700">File Event</label>
              <div class="mt-1">
                <select
                  id="fileEvent"
                  v-model="form.trigger.config.fileEvent"
                  class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                >
                  <option value="created">File Created</option>
                  <option value="modified">File Modified</option>
                  <option value="deleted">File Deleted</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Email Configuration -->
          <div v-else-if="form.trigger.type === 'email'" class="mt-4 space-y-4">
            <div>
              <label for="emailAddress" class="block text-sm font-medium text-gray-700">Email Address</label>
              <div class="mt-1">
                <input
                  type="email"
                  id="emailAddress"
                  v-model="form.trigger.config.emailAddress"
                  placeholder="trigger@example.com"
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label for="emailFilter" class="block text-sm font-medium text-gray-700">Filter</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="emailFilter"
                  v-model="form.trigger.config.emailFilter"
                  placeholder="subject:Important"
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">Filter emails by subject, sender, or content</p>
            </div>
          </div>

          <!-- Slack Configuration -->
          <div v-else-if="form.trigger.type === 'slack'" class="mt-4 space-y-4">
            <div>
              <label for="slackEvent" class="block text-sm font-medium text-gray-700">Slack Event</label>
              <div class="mt-1">
                <select
                  id="slackEvent"
                  v-model="form.trigger.config.slackEvent"
                  class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                >
                  <option value="message">New Message</option>
                  <option value="reaction">Reaction Added</option>
                  <option value="mention">Mention</option>
                  <option value="channel">Channel Activity</option>
                </select>
              </div>
            </div>
            <div>
              <label for="slackChannel" class="block text-sm font-medium text-gray-700">Channel</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="slackChannel"
                  v-model="form.trigger.config.slackChannel"
                  placeholder="#general"
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <!-- GitHub Configuration -->
          <div v-else-if="form.trigger.type === 'github'" class="mt-4 space-y-4">
            <div>
              <label for="githubEvent" class="block text-sm font-medium text-gray-700">GitHub Event</label>
              <div class="mt-1">
                <select
                  id="githubEvent"
                  v-model="form.trigger.config.githubEvent"
                  class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                >
                  <option value="push">Push</option>
                  <option value="pull_request">Pull Request</option>
                  <option value="issues">Issues</option>
                  <option value="release">Release</option>
                </select>
              </div>
            </div>
            <div>
              <label for="githubRepo" class="block text-sm font-medium text-gray-700">Repository</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="githubRepo"
                  v-model="form.trigger.config.githubRepo"
                  placeholder="owner/repo"
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <!-- Jira Configuration -->
          <div v-else-if="form.trigger.type === 'jira'" class="mt-4 space-y-4">
            <div>
              <label for="jiraEvent" class="block text-sm font-medium text-gray-700">Jira Event</label>
              <div class="mt-1">
                <select
                  id="jiraEvent"
                  v-model="form.trigger.config.jiraEvent"
                  class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                >
                  <option value="issue_created">Issue Created</option>
                  <option value="issue_updated">Issue Updated</option>
                  <option value="issue_deleted">Issue Deleted</option>
                  <option value="comment_created">Comment Created</option>
                </select>
              </div>
            </div>
            <div>
              <label for="jiraProject" class="block text-sm font-medium text-gray-700">Project</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="jiraProject"
                  v-model="form.trigger.config.jiraProject"
                  placeholder="PROJ"
                  class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <!-- Manual Configuration -->
          <div v-else-if="form.trigger.type === 'manual'" class="mt-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-sm text-gray-600">This workflow will only be triggered manually through the dashboard or API.</p>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Actions Section -->
      <div class="mt-8">
        <h3 class="text-lg font-medium text-gray-900">Actions</h3>
        <p class="mt-1 text-sm text-gray-500">Define what happens when the workflow is triggered.</p>
        
        <div v-for="(action, index) in form.actions" :key="index" class="mt-4 p-4 border border-gray-200 rounded-lg">
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-sm font-medium text-gray-700">Action {{ index + 1 }}</h4>
            <button
              type="button"
              @click="removeAction(index)"
              class="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label :for="'actionType' + index" class="block text-sm font-medium text-gray-700">Action Type</label>
              <div class="mt-1">
                <select
                  :id="'actionType' + index"
                  v-model="action.type"
                  class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                >
                  <option value="http">HTTP Request</option>
                  <option value="email">Send Email</option>
                  <option value="slack">Slack Message</option>
                  <option value="database">Database Operation</option>
                  <option value="file">File Operation</option>
                  <option value="github">GitHub Action</option>
                  <option value="jira">Jira Action</option>
                  <option value="script">Custom Script</option>
                </select>
              </div>
            </div>

            <!-- HTTP Action -->
            <div v-if="action.type === 'http'" class="space-y-4">
              <div>
                <label :for="'httpMethod' + index" class="block text-sm font-medium text-gray-700">HTTP Method</label>
                <div class="mt-1">
                  <select
                    :id="'httpMethod' + index"
                    v-model="action.config.method"
                    class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                    <option value="PATCH">PATCH</option>
                  </select>
                </div>
              </div>
              <div>
                <label :for="'httpUrl' + index" class="block text-sm font-medium text-gray-700">URL</label>
                <div class="mt-1">
                  <input
                    type="url"
                    :id="'httpUrl' + index"
                    v-model="action.config.url"
                    placeholder="https://api.example.com/endpoint"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label :for="'httpBody' + index" class="block text-sm font-medium text-gray-700">Request Body</label>
                <div class="mt-1">
                  <textarea
                    :id="'httpBody' + index"
                    v-model="action.config.body"
                    rows="4"
                    placeholder='{"key": "value"}'
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 font-mono"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Email Action -->
            <div v-else-if="action.type === 'email'" class="space-y-4">
              <div>
                <label :for="'emailTo' + index" class="block text-sm font-medium text-gray-700">To</label>
                <div class="mt-1">
                  <input
                    type="email"
                    :id="'emailTo' + index"
                    v-model="action.config.to"
                    placeholder="recipient@example.com"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label :for="'emailSubject' + index" class="block text-sm font-medium text-gray-700">Subject</label>
                <div class="mt-1">
                  <input
                    type="text"
                    :id="'emailSubject' + index"
                    v-model="action.config.subject"
                    placeholder="Email Subject"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label :for="'emailBody' + index" class="block text-sm font-medium text-gray-700">Body</label>
                <div class="mt-1">
                  <textarea
                    :id="'emailBody' + index"
                    v-model="action.config.body"
                    rows="4"
                    placeholder="Email body content"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Slack Action -->
            <div v-else-if="action.type === 'slack'" class="space-y-4">
              <div>
                <label :for="'slackChannel' + index" class="block text-sm font-medium text-gray-700">Channel</label>
                <div class="mt-1">
                  <input
                    type="text"
                    :id="'slackChannel' + index"
                    v-model="action.config.channel"
                    placeholder="#general"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label :for="'slackMessage' + index" class="block text-sm font-medium text-gray-700">Message</label>
                <div class="mt-1">
                  <textarea
                    :id="'slackMessage' + index"
                    v-model="action.config.message"
                    rows="4"
                    placeholder="Slack message content"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Database Action -->
            <div v-else-if="action.type === 'database'" class="space-y-4">
              <div>
                <label :for="'dbOperation' + index" class="block text-sm font-medium text-gray-700">Operation</label>
                <div class="mt-1">
                  <select
                    :id="'dbOperation' + index"
                    v-model="action.config.operation"
                    class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  >
                    <option value="query">Execute Query</option>
                    <option value="insert">Insert Data</option>
                    <option value="update">Update Data</option>
                    <option value="delete">Delete Data</option>
                  </select>
                </div>
              </div>
              <div>
                <label :for="'dbQuery' + index" class="block text-sm font-medium text-gray-700">Query/Data</label>
                <div class="mt-1">
                  <textarea
                    :id="'dbQuery' + index"
                    v-model="action.config.query"
                    rows="4"
                    placeholder="SQL query or JSON data"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 font-mono"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- File Action -->
            <div v-else-if="action.type === 'file'" class="space-y-4">
              <div>
                <label :for="'fileOperation' + index" class="block text-sm font-medium text-gray-700">Operation</label>
                <div class="mt-1">
                  <select
                    :id="'fileOperation' + index"
                    v-model="action.config.operation"
                    class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  >
                    <option value="read">Read File</option>
                    <option value="write">Write File</option>
                    <option value="append">Append to File</option>
                    <option value="delete">Delete File</option>
                  </select>
                </div>
              </div>
              <div>
                <label :for="'filePath' + index" class="block text-sm font-medium text-gray-700">File Path</label>
                <div class="mt-1">
                  <input
                    type="text"
                    :id="'filePath' + index"
                    v-model="action.config.path"
                    placeholder="/path/to/file"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  />
                </div>
              </div>
              <div v-if="['write', 'append'].includes(action.config.operation)">
                <label :for="'fileContent' + index" class="block text-sm font-medium text-gray-700">Content</label>
                <div class="mt-1">
                  <textarea
                    :id="'fileContent' + index"
                    v-model="action.config.content"
                    rows="4"
                    placeholder="File content"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- GitHub Action -->
            <div v-else-if="action.type === 'github'" class="space-y-4">
              <div>
                <label :for="'githubAction' + index" class="block text-sm font-medium text-gray-700">Action</label>
                <div class="mt-1">
                  <select
                    :id="'githubAction' + index"
                    v-model="action.config.action"
                    class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  >
                    <option value="create_issue">Create Issue</option>
                    <option value="create_pr">Create Pull Request</option>
                    <option value="comment">Add Comment</option>
                    <option value="label">Add Label</option>
                  </select>
                </div>
              </div>
              <div>
                <label :for="'githubRepo' + index" class="block text-sm font-medium text-gray-700">Repository</label>
                <div class="mt-1">
                  <input
                    type="text"
                    :id="'githubRepo' + index"
                    v-model="action.config.repo"
                    placeholder="owner/repo"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label :for="'githubContent' + index" class="block text-sm font-medium text-gray-700">Content</label>
                <div class="mt-1">
                  <textarea
                    :id="'githubContent' + index"
                    v-model="action.config.content"
                    rows="4"
                    placeholder="Issue/PR content"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Jira Action -->
            <div v-else-if="action.type === 'jira'" class="space-y-4">
              <div>
                <label :for="'jiraAction' + index" class="block text-sm font-medium text-gray-700">Action</label>
                <div class="mt-1">
                  <select
                    :id="'jiraAction' + index"
                    v-model="action.config.action"
                    class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  >
                    <option value="create_issue">Create Issue</option>
                    <option value="update_issue">Update Issue</option>
                    <option value="add_comment">Add Comment</option>
                    <option value="transition">Transition Issue</option>
                  </select>
                </div>
              </div>
              <div>
                <label :for="'jiraProject' + index" class="block text-sm font-medium text-gray-700">Project</label>
                <div class="mt-1">
                  <input
                    type="text"
                    :id="'jiraProject' + index"
                    v-model="action.config.project"
                    placeholder="PROJ"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label :for="'jiraContent' + index" class="block text-sm font-medium text-gray-700">Content</label>
                <div class="mt-1">
                  <textarea
                    :id="'jiraContent' + index"
                    v-model="action.config.content"
                    rows="4"
                    placeholder="Issue content or comment"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Custom Script Action -->
            <div v-else-if="action.type === 'script'" class="space-y-4">
              <div>
                <label :for="'scriptLanguage' + index" class="block text-sm font-medium text-gray-700">Language</label>
                <div class="mt-1">
                  <select
                    :id="'scriptLanguage' + index"
                    v-model="action.config.language"
                    class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="shell">Shell</option>
                  </select>
                </div>
              </div>
              <div>
                <label :for="'scriptCode' + index" class="block text-sm font-medium text-gray-700">Script</label>
                <div class="mt-1">
                  <textarea
                    :id="'scriptCode' + index"
                    v-model="action.config.code"
                    rows="6"
                    placeholder="Your custom script code"
                    class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 font-mono"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="addAction"
          class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Action
        </button>
      </div>

      <!-- Submit Button -->
      <div class="mt-8">
        <button
          type="submit"
          class="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Workflow
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
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

    // Send to API
    const response = await fetch('/api/workflows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workflowData)
    });

    if (!response.ok) {
      throw new Error('Failed to create workflow');
    }

    // Redirect to workflows list
    router.push('/workflows');
  } catch (error) {
    console.error('Error creating workflow:', error);
    // Handle error (show notification, etc.)
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