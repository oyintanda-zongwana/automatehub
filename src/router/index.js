import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Lazy-loaded components
const Login = () => import('../views/Login.vue');
const Register = () => import('../views/Register.vue');
const ForgotPassword = () => import('../views/ForgotPassword.vue');
const ResetPassword = () => import('../views/ResetPassword.vue');
const Dashboard = () => import('../views/Dashboard.vue');
const CreateWorkflow = () => import('../views/CreateWorkflow.vue');

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: { requiresGuest: true }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/workflows/create',
    name: 'CreateWorkflow',
    component: CreateWorkflow,
    meta: { requiresAuth: true }
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
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = await authStore.checkAuth();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router; 