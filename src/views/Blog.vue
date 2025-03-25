<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-white py-16 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            AutomateHub Blog
          </h1>
          <p class="mt-6 max-w-3xl mx-auto text-xl text-gray-500">
            Latest insights, updates, and best practices in workflow automation
          </p>
        </div>
      </div>
    </div>

    <!-- Blog Posts Grid -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-2">
          <!-- Sample Blog Posts -->
          <article class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img class="w-full h-48 object-cover" src="/blog/automation-trends.jpg" alt="Automation Trends">
            <div class="p-8">
              <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <time>March 15, 2024</time>
                <span>•</span>
                <span>5 min read</span>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 mb-4">
                Top Automation Trends in 2024
              </h2>
              <p class="text-gray-600 mb-4">
                Discover the latest trends shaping the future of workflow automation and how they can benefit your business.
              </p>
              <router-link to="/blog/automation-trends-2024" class="text-indigo-600 hover:text-indigo-800 font-medium">
                Read more →
              </router-link>
            </div>
          </article>

          <article class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img class="w-full h-48 object-cover" src="/blog/productivity-tips.jpg" alt="Productivity Tips">
            <div class="p-8">
              <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <time>March 10, 2024</time>
                <span>•</span>
                <span>4 min read</span>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 mb-4">
                10 Ways to Boost Team Productivity
              </h2>
              <p class="text-gray-600 mb-4">
                Learn how automation can help your team achieve more while working less.
              </p>
              <router-link to="/blog/productivity-tips" class="text-indigo-600 hover:text-indigo-800 font-medium">
                Read more →
              </router-link>
            </div>
          </article>

          <!-- More blog posts can be added here -->
        </div>

        <!-- Newsletter Signup -->
        <div class="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p class="text-gray-600 mb-8">
              Subscribe to our newsletter for the latest automation insights and tips.
            </p>
            <form class="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
              <button
                type="submit"
                class="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed for now
</script> 