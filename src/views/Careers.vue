<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-white py-16 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Join Our Team
          </h1>
          <p class="mt-6 max-w-3xl mx-auto text-xl text-gray-500">
            Help us build the future of workflow automation. We're looking for talented individuals who are passionate about making work easier for everyone.
          </p>
        </div>
      </div>
    </div>

    <!-- Culture Section -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-extrabold text-gray-900">Our Culture</h2>
          <p class="mt-4 text-lg text-gray-500">
            At AutomateHub, we believe in fostering an environment of innovation, collaboration, and growth.
          </p>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div class="text-center">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 mx-auto">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">Innovation First</h3>
            <p class="mt-2 text-base text-gray-500">
              We encourage creative thinking and welcome new ideas that push the boundaries of what's possible.
            </p>
          </div>
          <div class="text-center">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 mx-auto">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">Team Collaboration</h3>
            <p class="mt-2 text-base text-gray-500">
              Work with talented individuals who share your passion for excellence and innovation.
            </p>
          </div>
          <div class="text-center">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 mx-auto">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">Growth Opportunities</h3>
            <p class="mt-2 text-base text-gray-500">
              Continuous learning and career development are core parts of our culture.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Open Positions -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-extrabold text-gray-900">Open Positions</h2>
          <p class="mt-4 text-lg text-gray-500">
            Join us in our mission to transform how people work
          </p>
        </div>
        <div class="space-y-8">
          <!-- Engineering -->
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Senior Full Stack Developer</h3>
              <p class="text-gray-600 mb-4">
                We're looking for an experienced developer to help build and scale our automation platform.
              </p>
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Full-time</span>
                <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Remote</span>
                <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Engineering</span>
              </div>
              <router-link
                to="/careers/senior-full-stack-developer"
                class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Learn More
              </router-link>
            </div>
          </div>

          <!-- Product -->
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Product Manager</h3>
              <p class="text-gray-600 mb-4">
                Drive the vision and strategy for our automation products and features.
              </p>
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Full-time</span>
                <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Remote</span>
                <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Product</span>
              </div>
              <router-link
                to="/careers/product-manager"
                class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Learn More
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed for now
</script> 