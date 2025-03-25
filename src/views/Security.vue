<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-white py-16 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Security First
          </h1>
          <p class="mt-6 max-w-3xl mx-auto text-xl text-gray-500">
            At AutomateHub, security is not just a feature - it's a fundamental principle that guides everything we do.
          </p>
        </div>
      </div>
    </div>

    <!-- Security Features Grid -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <!-- Data Encryption -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-8">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 class="ml-4 text-2xl font-bold text-gray-900">Data Encryption</h3>
              </div>
              <p class="mt-6 text-base text-gray-500">
                All data is encrypted at rest and in transit using industry-standard AES-256 encryption. Your sensitive information remains protected at all times.
              </p>
            </div>
          </div>

          <!-- Access Control -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-8">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h3 class="ml-4 text-2xl font-bold text-gray-900">Access Control</h3>
              </div>
              <p class="mt-6 text-base text-gray-500">
                Granular role-based access control ensures that users can only access the resources they need. Multi-factor authentication adds an extra layer of security.
              </p>
            </div>
          </div>

          <!-- Compliance -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-8">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 class="ml-4 text-2xl font-bold text-gray-900">Compliance</h3>
              </div>
              <p class="mt-6 text-base text-gray-500">
                We maintain compliance with major security standards including SOC 2, GDPR, and ISO 27001. Regular audits ensure we meet and exceed security requirements.
              </p>
            </div>
          </div>

          <!-- Monitoring -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-8">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 class="ml-4 text-2xl font-bold text-gray-900">24/7 Monitoring</h3>
              </div>
              <p class="mt-6 text-base text-gray-500">
                Our security team monitors systems around the clock for potential threats. Advanced intrusion detection and prevention systems protect against attacks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Security Certifications -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900">Security Certifications</h2>
          <p class="mt-4 text-lg text-gray-500">
            We maintain the highest security standards in the industry
          </p>
        </div>
        <div class="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div class="col-span-1 flex justify-center">
            <img class="h-12" src="/certifications/soc2.png" alt="SOC 2">
          </div>
          <div class="col-span-1 flex justify-center">
            <img class="h-12" src="/certifications/gdpr.png" alt="GDPR">
          </div>
          <div class="col-span-1 flex justify-center">
            <img class="h-12" src="/certifications/iso27001.png" alt="ISO 27001">
          </div>
          <div class="col-span-1 flex justify-center">
            <img class="h-12" src="/certifications/hipaa.png" alt="HIPAA">
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-indigo-700">
      <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          <span class="block">Ready to secure your workflows?</span>
          <span class="block">Start with AutomateHub today.</span>
        </h2>
        <p class="mt-4 text-lg leading-6 text-indigo-200">
          Join thousands of companies who trust AutomateHub with their automation security.
        </p>
        <router-link
          to="/register"
          class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
        >
          Get started
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed
</script> 