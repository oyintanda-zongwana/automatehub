import { defineStore } from 'pinia';
import api from '../config/axios';

export const useWorkflowStore = defineStore('workflow', {
  state: () => ({
    workflows: [],
    currentWorkflow: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchWorkflows() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get('/workflows');
        this.workflows = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Failed to fetch workflows';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createWorkflow(workflowData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.post('/workflows', workflowData);
        this.workflows.push(response.data);
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Failed to create workflow';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateWorkflow(id, workflowData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.put(`/workflows/${id}`, workflowData);
        const index = this.workflows.findIndex(w => w._id === id);
        if (index !== -1) {
          this.workflows[index] = response.data;
        }
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Failed to update workflow';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteWorkflow(id) {
      this.loading = true;
      this.error = null;
      try {
        await api.delete(`/workflows/${id}`);
        this.workflows = this.workflows.filter(w => w._id !== id);
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Failed to delete workflow';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getWorkflowById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get(`/workflows/${id}`);
        this.currentWorkflow = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Failed to fetch workflow';
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
}); 