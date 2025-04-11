import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import CreateWorkflow from '../views/CreateWorkflow.vue';
import PricingPlans from '../components/PricingPlans.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/create-workflow',
    name: 'CreateWorkflow',
    component: CreateWorkflow,
    meta: { requiresAuth: true }
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: PricingPlans
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = token !== null;
  
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next('/login');
      return;
    }
    
    try {
      // Validate token by fetching user data
      const authStore = useAuthStore();
      await authStore.fetchUser();
      next();
    } catch (error) {
      console.error('Token validation failed:', error);
      // Clear invalid token
      localStorage.removeItem('token');
      next('/login');
    }
  } else {
    next();
  }
});

export default router; 