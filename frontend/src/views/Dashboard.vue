<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <div class="user-info">
        <span>{{ user.name }}</span>
        <span class="plan-badge">{{ currentPlan }}</span>
      </div>
    </header>

    <div class="dashboard-grid">
      <div class="stats-card">
        <h3>Automations</h3>
        <div class="stat-value">{{ stats.totalAutomations }}</div>
        <div class="stat-label">Active</div>
      </div>

      <div class="stats-card">
        <h3>Tasks</h3>
        <div class="stat-value">{{ stats.completedTasks }}</div>
        <div class="stat-label">Completed This Month</div>
      </div>

      <div class="stats-card">
        <h3>Team Members</h3>
        <div class="stat-value">{{ stats.teamMembers }}</div>
        <div class="stat-label">Active</div>
      </div>
    </div>

    <div class="workspace-section">
      <div class="section-header">
        <h2>Workspaces</h2>
        <button class="create-button" @click="createWorkspace">
          Create Workspace
        </button>
      </div>

      <div class="workspace-grid">
        <div
          v-for="workspace in workspaces"
          :key="workspace._id"
          class="workspace-card"
        >
          <h3>{{ workspace.name }}</h3>
          <div class="workspace-stats">
            <span>{{ workspace.members.length }} members</span>
            <span>{{ workspace.automations }} automations</span>
          </div>
          <div class="workspace-actions">
            <button @click="openWorkspace(workspace)">Open</button>
            <button @click="manageWorkspace(workspace)">Manage</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "Dashboard",
  setup() {
    const store = useStore();
    const user = ref({ name: "", plan: "Free" });
    const stats = ref({
      totalAutomations: 0,
      completedTasks: 0,
      teamMembers: 0,
    });
    const workspaces = ref([]);

    const fetchDashboardData = async () => {
      try {
        const [userData, statsData, workspacesData] = await Promise.all([
          store.dispatch("user/getProfile"),
          store.dispatch("dashboard/getStats"),
          store.dispatch("workspace/getWorkspaces"),
        ]);

        user.value = userData;
        stats.value = statsData;
        workspaces.value = workspacesData;
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    const createWorkspace = async () => {
      try {
        await store.dispatch("workspace/createWorkspace");
        await fetchDashboardData();
      } catch (error) {
        console.error("Failed to create workspace:", error);
      }
    };

    const openWorkspace = (workspace) => {
      store.commit("workspace/setCurrentWorkspace", workspace);
      // Navigate to workspace view
    };

    const manageWorkspace = (workspace) => {
      // Navigate to workspace settings
    };

    onMounted(fetchDashboardData);

    return {
      user,
      stats,
      workspaces,
      createWorkspace,
      openWorkspace,
      manageWorkspace,
    };
  },
};
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.plan-badge {
  background-color: var(--primary);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stats-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 2rem;
  color: var(--primary);
  margin: 0.5rem 0;
}

.stat-label {
  color: var(--text);
  opacity: 0.8;
}

.workspace-section {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.create-button {
  background-color: var(--success);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.workspace-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.workspace-card {
  border: 1px solid var(--primary);
  border-radius: 8px;
  padding: 1.5rem;
}

.workspace-stats {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  color: var(--text);
  opacity: 0.8;
}

.workspace-actions {
  display: flex;
  gap: 0.5rem;
}

.workspace-actions button {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: var(--primary);
  color: white;
}

.workspace-actions button:hover {
  background-color: var(--secondary);
}
</style>
