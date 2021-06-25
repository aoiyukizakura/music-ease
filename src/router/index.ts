import type { Router, RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory, } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
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
  history: createWebHashHistory(),
  routes
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