<template>
  <div class="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Contact Us
        </h1>
        <p class="mt-4 text-lg text-gray-500">
          Have questions or need support? We're here to help.
        </p>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
        <!-- Contact Information -->
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Get in Touch</h2>
          <p class="mt-4 text-lg text-gray-500">
            Our support team is available to assist you with any questions or concerns.
          </p>

          <dl class="mt-8 space-y-6">
            <dt class="sr-only">Email</dt>
            <dd class="flex">
              <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="ml-3 text-gray-700">
                <a href="mailto:support@automatehub.com" class="hover:text-indigo-600">
                  support@automatehub.com
                </a>
              </span>
            </dd>

            <dt class="sr-only">Phone</dt>
            <dd class="flex">
              <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="ml-3 text-gray-700">
                <a href="tel:0764801680" class="hover:text-indigo-600">
                  076 480 1680
                </a>
              </span>
            </dd>

            <dt class="sr-only">Office</dt>
            <dd class="flex">
              <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="ml-3 text-gray-700">
                AutomateHub HQ<br>
                123 Automation Street<br>
                Tech City, TC 12345
              </span>
            </dd>
          </dl>

          <div class="mt-12">
            <h2 class="text-2xl font-bold text-gray-900">Support Hours</h2>
            <dl class="mt-4 space-y-4">
              <div>
                <dt class="text-lg font-medium text-gray-900">Monday - Friday</dt>
                <dd class="text-gray-700">9:00 AM - 6:00 PM (GMT+2)</dd>
              </div>
              <div>
                <dt class="text-lg font-medium text-gray-900">Saturday</dt>
                <dd class="text-gray-700">10:00 AM - 4:00 PM (GMT+2)</dd>
              </div>
              <div>
                <dt class="text-lg font-medium text-gray-900">Sunday</dt>
                <dd class="text-gray-700">Closed</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white py-10 px-6 shadow-xl rounded-lg sm:px-10">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  required
                  class="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <div class="mt-1">
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  required
                  class="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="subject"
                  v-model="form.subject"
                  required
                  class="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
              <div class="mt-1">
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  required
                  class="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>

            <div class="flex items-center">
              <input
                id="newsletter"
                v-model="form.newsletter"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="newsletter" class="ml-2 block text-sm text-gray-700">
                Subscribe to our newsletter for updates and tips
              </label>
            </div>

            <div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {{ loading ? 'Sending...' : 'Send Message' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const loading = ref(false);
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  newsletter: false
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    // Here you would typically make an API call to send the message
    console.log('Form submitted:', form);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Message sent successfully!');
    // Reset form
    Object.keys(form).forEach(key => {
      if (key !== 'newsletter') form[key] = '';
    });
  } catch (error) {
    console.error('Error sending message:', error);
    alert('Failed to send message. Please try again.');
  } finally {
    loading.value = false;
  }
};
</script> 