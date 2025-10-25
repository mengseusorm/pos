import { useAuthStore } from '@/plugins/router/store/authStore';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default function (app) {
  app.use(router)
}

router.beforeEach((to, from) => {
  const authStore = useAuthStore() 
  const isAuthenticated = !!localStorage.getItem('token')

  if (!isAuthenticated && to.path !== '/login' && to.path !== '/register') {
    return '/login'
  }
  
  if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    return '/dashboard'
  }
})

