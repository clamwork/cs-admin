import Vue, { AsyncComponent } from 'vue';
import Router, { RouteConfig, Route, NavigationGuard } from 'vue-router';

import { loginIn } from '../utils/loginIn';

const index: AsyncComponent = (): any => import(/* webpackChunkName: "index" */ '@/pages/index.vue');
const home: AsyncComponent = (): any => import(/* webpackChunkName: "home" */ '@/pages/Home/Index.vue');

Vue.use(Router);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: '首页',
    component: index,
    redirect: '/home',
    meta: { leaf: true, icon: 'icon-home' },
    children: [
      { path: '/home', component: home, name: '我的面板', meta: { requiresAuth: true } },
    ],
  },
];

const router: Router = new Router({
  mode: 'history',
  base: __dirname,
  routes,
});

router.beforeEach((to: Route, from: Route, next: any): void => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loginIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
