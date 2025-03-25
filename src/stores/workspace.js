import { defineStore } from 'pinia';
import { ref } from 'vue';
import { workspaceApi } from '../api';

export const useWorkspaceStore = defineStore('workspace', () => {
  const currentWorkspace = ref(null);
  const members = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Fetch current workspace
  const fetchCurrentWorkspace = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await workspaceApi.getCurrentWorkspace();
      currentWorkspace.value = response.data;
      await fetchMembers(response.data.id);
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching workspace:', err);
    } finally {
      loading.value = false;
    }
  };

  // Fetch workspace members
  const fetchMembers = async (workspaceId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await workspaceApi.getMembers(workspaceId);
      members.value = response.data;
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching members:', err);
    } finally {
      loading.value = false;
    }
  };

  // Update workspace
  const updateWorkspace = async (updates) => {
    if (!currentWorkspace.value?.id) return;
    
    loading.value = true;
    error.value = null;
    try {
      const response = await workspaceApi.updateWorkspace(currentWorkspace.value.id, updates);
      currentWorkspace.value = response.data;
    } catch (err) {
      error.value = err.message;
      console.error('Error updating workspace:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Add member to workspace
  const addMember = async (email, role) => {
    if (!currentWorkspace.value?.id) return;
    
    loading.value = true;
    error.value = null;
    try {
      const response = await workspaceApi.addMember(currentWorkspace.value.id, email, role);
      members.value.push(response.data);
    } catch (err) {
      error.value = err.message;
      console.error('Error adding member:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Remove member from workspace
  const removeMember = async (memberId) => {
    if (!currentWorkspace.value?.id) return;
    
    loading.value = true;
    error.value = null;
    try {
      await workspaceApi.removeMember(currentWorkspace.value.id, memberId);
      members.value = members.value.filter(member => member.id !== memberId);
    } catch (err) {
      error.value = err.message;
      console.error('Error removing member:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Check if user has a specific role in the workspace
  const hasRole = (role) => {
    if (!currentWorkspace.value || !members.value.length) return false;
    
    const currentUser = members.value.find(member => 
      member.userId === currentWorkspace.value.ownerId
    );
    
    return currentUser?.role === role;
  };

  return {
    currentWorkspace,
    members,
    loading,
    error,
    fetchCurrentWorkspace,
    fetchMembers,
    updateWorkspace,
    addMember,
    removeMember,
    hasRole
  };
}); 