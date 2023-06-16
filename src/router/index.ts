import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName : "Home"*/ "@/views/HomePage.vue")
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName : "Home"*/ '@/views/AboutPage.vue')
    },
    {
      path: '/timeline',
      name: 'Timeline',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName : "Home"*/ '@/views/TimelinePage.vue')
    }
  ],
  linkActiveClass: "route-active",
  scrollBehavior (to: RouteLocationNormalized) {
    document.getElementById("app")?.scrollIntoView();
  }
})

export default router
