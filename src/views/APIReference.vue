<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-8xl mx-auto">
      <div class="flex">
        <!-- Sidebar -->
        <div class="hidden lg:block w-64 bg-white border-r border-gray-200 pt-6 sticky top-0 h-screen overflow-y-auto">
          <nav class="px-4">
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Introduction
                </h3>
                <div class="mt-2 space-y-1">
                  <a @click.prevent="scrollToSection('authentication')" href="#authentication" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Authentication</a>
                  <a @click.prevent="scrollToSection('errors')" href="#errors" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Errors</a>
                  <a @click.prevent="scrollToSection('rate-limits')" href="#rate-limits" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Rate Limits</a>
                </div>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Endpoints
                </h3>
                <div class="mt-2 space-y-1">
                  <a @click.prevent="scrollToSection('workflows')" href="#workflows" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Workflows</a>
                  <a @click.prevent="scrollToSection('triggers')" href="#triggers" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Triggers</a>
                  <a @click.prevent="scrollToSection('actions')" href="#actions" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Actions</a>
                  <a @click.prevent="scrollToSection('executions')" href="#executions" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Executions</a>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="flex-1 min-w-0 bg-white">
          <div class="py-8 px-4 sm:px-6 lg:px-8">
            <div class="prose max-w-none">
              <h1>API Reference</h1>
              <p class="lead">
                The AutomateHub API is organized around REST. Our API accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.
              </p>

              <h2 id="authentication" class="scroll-mt-6">Authentication</h2>
              <p>
                The AutomateHub API uses API keys to authenticate requests. You can view and manage your API keys in the Dashboard.
              </p>
              <pre><code>curl -X GET "https://api.automatehub.com/v1/workflows" \
  -H "Authorization: Bearer YOUR_API_KEY"</code></pre>

              <h2 id="errors" class="scroll-mt-6">Errors</h2>
              <p>
                AutomateHub uses conventional HTTP response codes to indicate the success or failure of an API request.
              </p>
              <ul>
                <li><code>200</code> - Success</li>
                <li><code>400</code> - Bad Request</li>
                <li><code>401</code> - Unauthorized</li>
                <li><code>403</code> - Forbidden</li>
                <li><code>404</code> - Not Found</li>
                <li><code>429</code> - Too Many Requests</li>
                <li><code>500</code> - Server Error</li>
              </ul>

              <h2 id="rate-limits" class="scroll-mt-6">Rate Limits</h2>
              <p>
                To ensure stability and fairness, the API enforces rate limits based on your plan.
              </p>

              <h2 id="workflows" class="scroll-mt-6">Workflows</h2>
              <h3>List all workflows</h3>
              <pre><code>GET /v1/workflows</code></pre>
              <p>Returns a list of your workflows.</p>

              <h4>Parameters</h4>
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Parameter
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      limit
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      integer
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">
                      A limit on the number of objects to be returned.
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      status
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      string
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">
                      Filter workflows by status (active, inactive, draft).
                    </td>
                  </tr>
                </tbody>
              </table>

              <h2 id="triggers" class="scroll-mt-6">Triggers</h2>
              <p>
                API endpoints for managing workflow triggers.
              </p>

              <h2 id="actions" class="scroll-mt-6">Actions</h2>
              <p>
                API endpoints for managing workflow actions.
              </p>

              <h2 id="executions" class="scroll-mt-6">Executions</h2>
              <p>
                API endpoints for viewing and managing workflow executions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<style>
.prose {
  max-width: 65ch;
}

.prose h1 {
  @apply text-4xl font-bold text-gray-900 mb-8;
}

.prose h2 {
  @apply text-2xl font-bold text-gray-900 mt-8 mb-4;
}

.prose h3 {
  @apply text-xl font-bold text-gray-900 mt-6 mb-3;
}

.prose h4 {
  @apply text-lg font-bold text-gray-900 mt-4 mb-2;
}

.prose p {
  @apply text-gray-600 mb-4;
}

.prose .lead {
  @apply text-xl text-gray-600;
}

.prose pre {
  @apply bg-gray-50 p-4 rounded-lg my-4 overflow-x-auto;
}

.prose code {
  @apply text-sm text-gray-800;
}

.prose ul {
  @apply list-disc list-inside space-y-2 mb-4;
}

.prose li {
  @apply text-gray-600;
}

table {
  @apply min-w-full divide-y divide-gray-200 mb-8;
}

.scroll-mt-6 {
  scroll-margin-top: 1.5rem;
}
</style> 