<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-white py-16 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About AutomateHub
          </h1>
          <p class="mt-6 max-w-3xl mx-auto text-xl text-gray-500">
            AutomateHub was founded with the mission to empower individuals and businesses by automating tedious tasks, allowing them to focus on what truly matters.
          </p>
        </div>
      </div>
    </div>

    <!-- Mission Section -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-3xl font-extrabold text-gray-900">Our Mission</h2>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We believe in the power of automation to transform businesses and improve lives. Our team comprises passionate professionals dedicated to innovation and excellence in workflow automation.
          </p>
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="py-16 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900">Our Values</h2>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="text-indigo-600 mb-4">
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
            <p class="text-gray-600">
              We constantly push the boundaries of what's possible in workflow automation.
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="text-indigo-600 mb-4">
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Customer Focus</h3>
            <p class="text-gray-600">
              Our customers' success is our success. We're dedicated to providing exceptional support and solutions.
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="text-indigo-600 mb-4">
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Security</h3>
            <p class="text-gray-600">
              We prioritize the security and privacy of our customers' data above all else.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900">Our Team</h2>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We're a diverse team of experts passionate about creating the best automation solutions.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          <div class="space-y-4">
            <div class="aspect-w-3 aspect-h-2">
              <img class="object-cover shadow-lg rounded-lg" src="/team/leadership.jpg" alt="Leadership team">
            </div>
            <div class="text-lg leading-6 font-medium space-y-1">
              <h3>Leadership</h3>
              <p class="text-indigo-600">Guiding our vision</p>
            </div>
          </div>

          <div class="space-y-4">
            <div class="aspect-w-3 aspect-h-2">
              <img class="object-cover shadow-lg rounded-lg" src="/team/engineering.jpg" alt="Engineering team">
            </div>
            <div class="text-lg leading-6 font-medium space-y-1">
              <h3>Engineering</h3>
              <p class="text-indigo-600">Building the future</p>
            </div>
          </div>

          <div class="space-y-4">
            <div class="aspect-w-3 aspect-h-2">
              <img class="object-cover shadow-lg rounded-lg" src="/team/support.jpg" alt="Support team">
            </div>
            <div class="text-lg leading-6 font-medium space-y-1">
              <h3>Support</h3>
              <p class="text-indigo-600">Here to help</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact CTA -->
    <div class="bg-indigo-700">
      <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          <span class="block">Want to learn more?</span>
          <span class="block">Get in touch with us.</span>
        </h2>
        <p class="mt-4 text-lg leading-6 text-indigo-200">
          We'd love to hear from you and discuss how AutomateHub can help your business.
        </p>
        <router-link
          to="/contact"
          class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
        >
          Contact us
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed
</script> 