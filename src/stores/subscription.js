import { defineStore } from 'pinia';
import { ref } from 'vue';
import { subscriptionApi } from '../api';

export const useSubscriptionStore = defineStore('subscription', () => {
  const currentPlan = ref(null);
  const subscriptionStatus = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Fetch current subscription
  const fetchCurrentSubscription = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await subscriptionApi.getCurrentSubscription();
      currentPlan.value = response.data.plan;
      subscriptionStatus.value = response.data.status;
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching subscription:', err);
    } finally {
      loading.value = false;
    }
  };

  // Subscribe to a plan
  const subscribe = async (planId, paymentMethodId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await subscriptionApi.createSubscription(planId, paymentMethodId);
      currentPlan.value = response.data.plan;
      subscriptionStatus.value = response.data.status;
      return response.data;
    } catch (err) {
      error.value = err.message;
      console.error('Error subscribing:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Update subscription
  const updateSubscription = async (subscriptionId, updates) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await subscriptionApi.updateSubscription(subscriptionId, updates);
      currentPlan.value = response.data.plan;
      subscriptionStatus.value = response.data.status;
      return response.data;
    } catch (err) {
      error.value = err.message;
      console.error('Error updating subscription:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Cancel subscription
  const cancelSubscription = async (subscriptionId) => {
    loading.value = true;
    error.value = null;
    try {
      await subscriptionApi.cancelSubscription(subscriptionId);
      currentPlan.value = null;
      subscriptionStatus.value = 'cancelled';
    } catch (err) {
      error.value = err.message;
      console.error('Error cancelling subscription:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Check if user has access to a feature
  const hasFeature = (feature) => {
    if (!currentPlan.value) return false;
    
    const featureAccess = {
      'free': ['basic_workflows', 'community_support'],
      'plus': ['basic_workflows', 'community_support', 'priority_support', 'slack_integration'],
      'pro': ['basic_workflows', 'community_support', 'priority_support', 'slack_integration', 'advanced_analytics', 'custom_branding'],
      'business': ['basic_workflows', 'community_support', 'priority_support', 'slack_integration', 'advanced_analytics', 'custom_branding', 'team_management', 'enterprise_support']
    };

    return featureAccess[currentPlan.value]?.includes(feature) || false;
  };

  return {
    currentPlan,
    subscriptionStatus,
    loading,
    error,
    fetchCurrentSubscription,
    subscribe,
    updateSubscription,
    cancelSubscription,
    hasFeature
  };
}); 