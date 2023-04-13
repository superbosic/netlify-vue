import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
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
    redirect: { name: RouteNames.TokenTable },
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: 'token-table',
        redirect: { name: RouteNames.TokenTableProjectInformation },
        component: () => import('@/pages/TokenTable/index.vue'),
        name: RouteNames.TokenTable,
        children: [
          {
            path: 'project-information',
            component: () => import('@/pages/TokenTable/TokenTableProjectInformation.vue'),
            name: RouteNames.TokenTableProjectInformation,
          },
          {
            path: 'token-allocation',
            component: () => import('@/pages/TokenTable/TokenTableTokenAllocation.vue'),
            name: RouteNames.TokenTableTokenAllocation,
          },
          {
            path: 'unlock-tokens',
            component: () => import('@/pages/TokenTable/TokenTableUnlockTokens.vue'),
            name: RouteNames.TokenTableUnlockTokens,
          },
        ],
      },
      {
        path: 'fundraising',
        component: () => import('@/pages/Fundraising/FundraisingPage.vue'),
        name: RouteNames.Fundraising,
      },
      {
        path: 'rounds',
        children: [
          {
            path: 'create',
            name: RouteNames.RoundCreate,
            component: () => import('@/pages/Rounds/RoundCreatePage.vue'),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
