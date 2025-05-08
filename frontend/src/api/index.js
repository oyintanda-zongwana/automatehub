import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://automatehub-pdpd.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile')
};

// Workflow endpoints
export const workflowApi = {
  // Get all workflows
  getWorkflows: () => api.get('/workflows'),
  
  // Get a specific workflow
  getWorkflow: (id) => api.get(`/workflows/${id}`),
  
  // Create a new workflow
  createWorkflow: (data) => api.post('/workflows', data),
  
  // Update a workflow
  updateWorkflow: (id, data) => api.patch(`/workflows/${id}`, data),
  
  // Delete a workflow
  deleteWorkflow: (id) => api.delete(`/workflows/${id}`),
  
  // Execute a workflow
  executeWorkflow: (id) => api.post(`/workflows/${id}/execute`),
  
  // Toggle workflow status
  toggleWorkflow: (id) => api.patch(`/workflows/${id}/toggle`)
};

// Workspace endpoints
export const workspaceApi = {
  getWorkspaces: () => api.get('/workspaces'),
  createWorkspace: (data) => api.post('/workspaces', data),
  updateWorkspace: (id, data) => api.patch(`/workspaces/${id}`, data),
  deleteWorkspace: (id) => api.delete(`/workspaces/${id}`)
};

export default api; 