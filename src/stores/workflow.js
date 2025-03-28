import { defineStore } from 'pinia';
import { workflowApi } from '../api';

export const useWorkflowStore = defineStore('workflow', {
  state: () => ({
    workflows: [],
    currentWorkflow: null,
    loading: false,
    error: null
  }),

  getters: {
    activeWorkflows: (state) => state.workflows.filter(w => w.status === 'active'),
    totalExecutions: (state) => state.workflows.reduce((sum, w) => sum + (w.successCount || 0) + (w.failureCount || 0), 0),
    successRate: (state) => {
      const total = state.workflows.reduce((sum, w) => sum + (w.successCount || 0) + (w.failureCount || 0), 0);
      const success = state.workflows.reduce((sum, w) => sum + (w.successCount || 0), 0);
      return total > 0 ? Math.round((success / total) * 100) : 0;
    }
  },

  actions: {
    async fetchWorkflows() {
      try {
        this.loading = true;
        const response = await workflowApi.getWorkflows();
        this.workflows = response.data;
        return this.workflows;
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
        const response = await workflowApi.getWorkflow(id);
        this.currentWorkflow = response.data;
        return this.currentWorkflow;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch workflow';
        throw this.error;
      } finally {
        this.loading = false;
      }
    },

    async createWorkflow(workflowData) {
      try {
        this.loading = true;
        const response = await workflowApi.createWorkflow(workflowData);
        this.workflows.push(response.data);
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create workflow';
        throw this.error;
      } finally {
        this.loading = false;
      }
    },

    async updateWorkflow(id, workflowData) {
      try {
        this.loading = true;
        const response = await workflowApi.updateWorkflow(id, workflowData);
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
        await workflowApi.deleteWorkflow(id);
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
    },

    async executeWorkflow(id) {
      try {
        this.loading = true;
        await workflowApi.executeWorkflow(id);
        await this.fetchWorkflow(id); // Refresh the workflow data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to execute workflow';
        throw this.error;
      } finally {
        this.loading = false;
      }
    },

    async toggleWorkflow(id) {
      try {
        this.loading = true;
        const response = await workflowApi.toggleWorkflow(id);
        const index = this.workflows.findIndex(w => w._id === id);
        if (index !== -1) {
          this.workflows[index] = response.data;
        }
        if (this.currentWorkflow?._id === id) {
          this.currentWorkflow = response.data;
        }
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to toggle workflow';
        throw this.error;
      } finally {
        this.loading = false;
      }
    }
  }
}); 