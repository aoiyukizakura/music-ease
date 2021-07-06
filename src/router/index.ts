
import { createWebHistory, createRouter, } from "vue-router";
import type { Router, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import("/@views/home/index.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('/@views/login/index.vue')
  },
  {
    path: '/library',
    name: 'library',
    component: () => import('/@views/library/index.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('/@views/search/index.vue')
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    component: () => import('/@views/playlist/index.vue')
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
  }
})

router.beforeEach((to, from, next) => {
  next()
  // if (!localStorage.getItem("userInfo") && to.meta.requireLogin) {
  //   next('/login')
  // } else {
  //   next()
  // }
})

export default router