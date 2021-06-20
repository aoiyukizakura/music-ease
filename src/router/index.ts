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
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  next()
  // if (!localStorage.getItem("userInfo") && to.path !== '/login') {
  //   next('/login')
  // } else {
  //   next()
  // }
})

export default router