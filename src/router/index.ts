
import { createWebHistory, createRouter, createWebHashHistory, } from "vue-router";
import type { Router, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import("/@views/home/index.vue"),
    meta: {
    }
  },
  {
    path: '/library',
    name: 'library',
    component: () => import('/@views/library/index.vue'),
    meta: {}
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('/@views/search/index.vue'),
    meta: {
    }
  },
  {
    path: '/login/:type',
    name: 'login',
    component: () => import('/@views/login/index.vue'),
    meta: {
    }
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    component: () => import('/@views/playlist/index.vue'),
    meta: {}
  },
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
  }
})

export default router