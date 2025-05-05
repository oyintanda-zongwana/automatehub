<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">AI Service Test</h2>
    
    <!-- Task Selection -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Select Task</label>
      <select 
        v-model="selectedTask" 
        class="block w-full pl-4 pr-10 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="summarize">Summarize Text</option>
        <option value="translate">Translate Text</option>
        <option value="classify">Classify Content</option>
        <option value="extract">Extract Information</option>
      </select>
    </div>

    <!-- Task-specific inputs -->
    <div class="space-y-4 mb-6">
      <!-- Translation target language -->
      <div v-if="selectedTask === 'translate'">
        <label class="block text-sm font-medium text-gray-700 mb-2">Target Language</label>
        <input 
          v-model="targetLanguage"
          type="text"
          placeholder="e.g., Spanish, French, German"
          class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <!-- Classification categories -->
      <div v-if="selectedTask === 'classify'">
        <label class="block text-sm font-medium text-gray-700 mb-2">Categories (comma-separated)</label>
        <input 
          v-model="categories"
          type="text"
          placeholder="e.g., Positive, Negative, Neutral"
          class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <!-- Extraction fields -->
      <div v-if="selectedTask === 'extract'">
        <label class="block text-sm font-medium text-gray-700 mb-2">Fields to Extract (comma-separated)</label>
        <input 
          v-model="fields"
          type="text"
          placeholder="e.g., name, email, phone"
          class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <!-- Input text -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Input Text</label>
        <textarea 
          v-model="inputText"
          rows="4"
          placeholder="Enter text to process"
          class="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>
    </div>

    <!-- Test button -->
    <button 
      @click="testAIService"
      :disabled="isLoading"
      class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      <span v-if="isLoading">Processing...</span>
      <span v-else>Test AI Service</span>
    </button>

    <!-- Results -->
    <div v-if="result" class="mt-6">
      <h3 class="text-lg font-medium text-gray-900 mb-2">Result:</h3>
      <div class="bg-gray-50 p-4 rounded-lg">
        <pre class="whitespace-pre-wrap">{{ result }}</pre>
      </div>
    </div>

    <!-- Error message -->
    <div v-if="error" class="mt-6">
      <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import { aiService } from '../services/aiService';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';

export default {
  name: 'AITest',
  setup() {
    const authStore = useAuthStore();
    const { isAuthenticated } = storeToRefs(authStore);
    return { isAuthenticated };
  },
  data() {
    return {
      selectedTask: 'summarize',
      inputText: '',
      targetLanguage: '',
      categories: '',
      fields: '',
      result: null,
      error: null,
      isLoading: false
    };
  },
  methods: {
    async testAIService() {
      if (!this.isAuthenticated) {
        this.error = 'Please log in to use the AI service';
        return;
      }

      this.isLoading = true;
      this.error = null;
      this.result = null;

      try {
        let response;
        switch (this.selectedTask) {
          case 'summarize':
            response = await aiService.summarizeText(this.inputText);
            break;
          case 'translate':
            response = await aiService.translateText(this.inputText, this.targetLanguage);
            break;
          case 'classify':
            response = await aiService.classifyContent(this.inputText, this.categories.split(',').map(c => c.trim()));
            break;
          case 'extract':
            response = await aiService.extractInformation(this.inputText, this.fields.split(',').map(f => f.trim()));
            break;
        }
        this.result = response.choices[0].message.content;
      } catch (err) {
        this.error = `Error: ${err.message}`;
        console.error('AI test failed:', err);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script> 