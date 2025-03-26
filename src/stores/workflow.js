import { defineStore } from 'pinia';
import api from '../api';

export const useWorkflowStore = defineStore('workflow', {
  state: () => ({
    workflows: [],
    currentWorkflow: null,
    loading: false,
    error: null
  }),

  actions: {
    async createWorkflow(workflowData) {
      try {
        this.loading = true;
        this.error = null;
        
        const response = await api.post('/workflows', workflowData);
        this.workflows.push(response.data);
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create workflow';
        throw this.error;
      } finally {
        this.loading = false;
      }
    },

    async fetchWorkflows() {
      try {
        this.loading = true;
        this.error = null;
        
        const response = await api.get('/workflows');
        this.workflows = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch workflows';
        throw this.error;
      } finally {
        this.loading = false;
      }
    },

    async fetchWorkflow(id) {
      try {
        this.loading = true;
        this.error = null;
        
        const response = await api.get(`/workflows/${id}`);
        this.currentWorkflow = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch workflow';
        throw this.error;
      } finally {
        this.loading = false;
      }
    },

    async updateWorkflow(id, workflowData) {
      try {
        this.loading = true;
        this.error = null;
        
        const response = await api.put(`/workflows/${id}`, workflowData);
        const index = this.workflows.findIndex(w => w._id === id);
        if (index !== -1) {
          this.workflows[index] = response.data;
        }
        if (this.currentWorkflow?._id === id) {
          this.currentWorkflow = response.data;
        }
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update workflow';
        throw this.error;
      } finally {
        this.loading = false;
      }
    },

    async deleteWorkflow(id) {
      try {
        this.loading = true;
        this.error = null;
        
        await api.delete(`/workflows/${id}`);
        this.workflows = this.workflows.filter(w => w._id !== id);
        if (this.currentWorkflow?._id === id) {
          this.currentWorkflow = null;
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete workflow';
        throw this.error;
      } finally {
        this.loading = false;
      }
    }
  }
}); 