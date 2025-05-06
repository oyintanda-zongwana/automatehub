import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Home from '../views/Home.vue';
import CreateWorkflow from '../views/workflow/CreateWorkflow.vue';
import AITest from '../components/AITest.vue';

// Lazy-loaded components
const Login = () => import('../views/Login.vue');
const Register = () => import('../views/Register.vue');
const ForgotPassword = () => import('../views/ForgotPassword.vue');
const ResetPassword = () => import('../views/ResetPassword.vue');
const Dashboard = () => import('../views/Dashboard.vue');
const Product = () => import('../views/Product.vue');
const Features = () => import('../views/Features.vue');
const Pricing = () => import('../views/Pricing.vue');
const Security = () => import('../views/Security.vue');
const About = () => import('../views/About.vue');
const Blog = () => import('../views/Blog.vue');
const Careers = () => import('../views/Careers.vue');
const Documentation = () => import('../views/Documentation.vue');
const APIReference = () => import('../views/APIReference.vue');
const Community = () => import('../views/Community.vue');
const Privacy = () => import('../views/Privacy.vue');
const Terms = () => import('../views/Terms.vue');
const Contact = () => import('../views/Contact.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    component: Product
  },
  {
    path: '/features',
    name: 'features',
    component: Features
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: Pricing
  },
  {
    path: '/security',
    name: 'security',
    component: Security
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/blog',
    name: 'blog',
    component: Blog
  },
  {
    path: '/careers',
    name: 'careers',
    component: Careers
  },
  {
    path: '/documentation',
    name: 'documentation',
    component: Documentation
  },
  {
    path: '/api-reference',
    name: 'api-reference',
    component: APIReference
  },
  {
    path: '/community',
    name: 'community',
    component: Community
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: Privacy
  },
  {
    path: '/terms',
    name: 'terms',
    component: Terms
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/ai-test',
    name: 'AITest',
    component: AITest,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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