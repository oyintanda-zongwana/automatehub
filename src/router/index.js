import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/workflows/create',
      name: 'create-workflow',
      component: () => import('../views/CreateWorkflow.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPassword.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../views/ResetPassword.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/Product.vue')
    },
    {
      path: '/features',
      name: 'features',
      component: () => import('../views/Features.vue')
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('../views/Pricing.vue')
    },
    {
      path: '/security',
      name: 'security',
      component: () => import('../views/Security.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/Blog.vue')
    },
    {
      path: '/careers',
      name: 'careers',
      component: () => import('../views/Careers.vue')
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: () => import('../views/Documentation.vue')
    },
    {
      path: '/api-reference',
      name: 'api-reference',
      component: () => import('../views/APIReference.vue')
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/Community.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/Privacy.vue')
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/Terms.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue')
    }
  ]
});

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = await authStore.checkAuth();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router; 