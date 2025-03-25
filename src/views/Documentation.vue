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
                  Getting Started
                </h3>
                <div class="mt-2 space-y-1">
                  <a @click.prevent="scrollToSection('introduction')" href="#introduction" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Introduction</a>
                  <a @click.prevent="scrollToSection('quickstart')" href="#quickstart" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Quick Start</a>
                  <a @click.prevent="scrollToSection('installation')" href="#installation" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Installation</a>
                </div>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Core Concepts
                </h3>
                <div class="mt-2 space-y-1">
                  <a @click.prevent="scrollToSection('workflows')" href="#workflows" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Workflows</a>
                  <a @click.prevent="scrollToSection('triggers')" href="#triggers" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Triggers</a>
                  <a @click.prevent="scrollToSection('actions')" href="#actions" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Actions</a>
                </div>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Advanced
                </h3>
                <div class="mt-2 space-y-1">
                  <a @click.prevent="scrollToSection('custom-integrations')" href="#custom-integrations" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Custom Integrations</a>
                  <a @click.prevent="scrollToSection('webhooks')" href="#webhooks" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Webhooks</a>
                  <a @click.prevent="scrollToSection('api')" href="#api" class="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">API Usage</a>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="flex-1 min-w-0 bg-white">
          <div class="py-8 px-4 sm:px-6 lg:px-8">
            <!-- Introduction -->
            <div id="introduction" class="prose max-w-none scroll-mt-6">
              <h1>Documentation</h1>
              <p class="lead">
                Welcome to the AutomateHub documentation. Here you'll find everything you need to know about setting up and using our workflow automation platform.
              </p>
              
              <h2>What is AutomateHub?</h2>
              <p>
                AutomateHub is a powerful workflow automation platform that helps teams streamline their processes and increase productivity. With our intuitive interface and extensive integration capabilities, you can automate repetitive tasks and focus on what matters most.
              </p>

              <h2 id="quickstart" class="scroll-mt-6">Quick Start</h2>
              <p>
                Get started with AutomateHub in minutes:
              </p>
              <ol>
                <li>Sign up for an account</li>
                <li>Create your first workflow</li>
                <li>Add triggers and actions</li>
                <li>Test and activate your workflow</li>
              </ol>

              <h2 id="installation" class="scroll-mt-6">Installation</h2>
              <p>
                AutomateHub can be installed in multiple ways depending on your needs:
              </p>
              <pre><code>npm install automatehub
# or
yarn add automatehub</code></pre>

              <h2 id="workflows" class="scroll-mt-6">Workflows</h2>
              <p>
                Workflows are the core building blocks of automation in AutomateHub. Each workflow consists of triggers and actions.
              </p>

              <h2 id="triggers" class="scroll-mt-6">Triggers</h2>
              <p>
                Triggers are events that start your workflow. They can be webhooks, scheduled events, or other integrations.
              </p>

              <h2 id="actions" class="scroll-mt-6">Actions</h2>
              <p>
                Actions are the tasks that your workflow performs when triggered. Chain multiple actions together for complex automations.
              </p>

              <h2 id="custom-integrations" class="scroll-mt-6">Custom Integrations</h2>
              <p>
                Build custom integrations to connect AutomateHub with your existing tools and services.
              </p>

              <h2 id="webhooks" class="scroll-mt-6">Webhooks</h2>
              <p>
                Use webhooks to trigger workflows from external services or send data to other applications.
              </p>

              <h2 id="api" class="scroll-mt-6">API Usage</h2>
              <p>
                Access the full power of AutomateHub programmatically through our REST API.
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

.prose p {
  @apply text-gray-600 mb-4;
}

.prose .lead {
  @apply text-xl text-gray-600;
}

.prose pre {
  @apply bg-gray-50 p-4 rounded-lg my-4;
}

.prose code {
  @apply text-sm text-gray-800;
}

.prose ol {
  @apply list-decimal list-inside space-y-2 mb-4;
}

.prose li {
  @apply text-gray-600;
}

.scroll-mt-6 {
  scroll-margin-top: 1.5rem;
}
</style> 