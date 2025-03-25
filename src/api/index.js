import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Subscription endpoints
export const subscriptionApi = {
  // Get available plans
  getPlans: () => api.get('/subscriptions/plans'),
  
  // Get current subscription
  getCurrentSubscription: () => api.get('/subscriptions/current'),
  
  // Create subscription
  createSubscription: (planId, paymentMethodId) => 
    api.post('/subscriptions', { planId, paymentMethodId }),
  
  // Update subscription
  updateSubscription: (subscriptionId, updates) => 
    api.patch(`/subscriptions/${subscriptionId}`, updates),
  
  // Cancel subscription
  cancelSubscription: (subscriptionId) => 
    api.delete(`/subscriptions/${subscriptionId}`),
  
  // Get subscription history
  getHistory: () => api.get('/subscriptions/history')
};

// Workspace endpoints
export const workspaceApi = {
  // Get current workspace
  getCurrentWorkspace: () => api.get('/workspaces/current'),
  
  // Update workspace
  updateWorkspace: (workspaceId, updates) => 
    api.patch(`/workspaces/${workspaceId}`, updates),
  
  // Get workspace members
  getMembers: (workspaceId) => api.get(`/workspaces/${workspaceId}/members`),
  
  // Add member to workspace
  addMember: (workspaceId, email, role) => 
    api.post(`/workspaces/${workspaceId}/members`, { email, role }),
  
  // Remove member from workspace
  removeMember: (workspaceId, memberId) => 
    api.delete(`/workspaces/${workspaceId}/members/${memberId}`)
};

export default api; 