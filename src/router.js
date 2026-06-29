// Router
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./views/index.vue'),
    name: 'home',
    meta: {
      beta: true,
    },
  },
]

const navOffset = 72

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: navOffset,
        behavior: 'smooth',
      }
    }

    return { top: 0 }
  },
})
