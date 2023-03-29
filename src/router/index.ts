import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RouteNames } from '@/router/routeNames';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/account',
    component: () => import('@/layouts/AccountLayout.vue'),
    children: [
      {
        name: RouteNames.AccountLogin,
        path: 'login',
        component: () => import('@/pages/Account/LoginPage.vue'),
      },
    ],
  },
  {
    path: '',
    redirect: { name: RouteNames.Main },
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '/main',
        component: () => import('@/pages/MainPage.vue'),
        name: RouteNames.Main,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
