import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/product',
      name: 'Product',
      component: () => import('../views/Product.vue')
    },
    {
      path: '/features',
      name: 'Features',
      component: () => import('../views/Features.vue')
    },
    {
      path: '/pricing',
      name: 'Pricing',
      component: () => import('../views/Pricing.vue')
    },
    {
      path: '/security',
      name: 'Security',
      component: () => import('../views/Security.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue')
    },
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('../views/Blog.vue')
    },
    {
      path: '/careers',
      name: 'Careers',
      component: () => import('../views/Careers.vue')
    },
    {
      path: '/documentation',
      name: 'Documentation',
      component: () => import('../views/Documentation.vue')
    },
    {
      path: '/api-reference',
      name: 'APIReference',
      component: () => import('../views/APIReference.vue')
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import('../views/Community.vue')
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: () => import('../views/Privacy.vue')
    },
    {
      path: '/terms',
      name: 'Terms',
      component: () => import('../views/Terms.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/Contact.vue')
    }
  ]
});

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router; 