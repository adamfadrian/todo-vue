import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginViewVue from '../views/LoginView.vue'
import { useLoginStore } from '@/stores/login'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/newTask',
      name: 'newTask',
      component: () => import('../views/NewTodo.vue'),
      meta: { requiresAuth: true }
    }, {
      path: '/',
      name: 'login',
      component: LoginViewVue
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useLoginStore()

  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
