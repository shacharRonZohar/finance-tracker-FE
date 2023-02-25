import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthPage.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/AuthPage.vue')
    },
    {
      path: '/monthly',
      name: 'monthly',
      component: () => import('@/views/MonthlyPage.vue')
    }
  ]
})

export default router
