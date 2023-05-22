import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName : "Home"*/ "@/views/HomeView.vue"),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName : "Home"*/ '../views/AboutView.vue')
    }
  ],
  linkActiveClass: "route-active",
  scrollBehavior (to: RouteLocationNormalized) {
    document.getElementById("app")?.scrollIntoView();
  }
})

export default router
