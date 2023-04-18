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
    redirect: { name: RouteNames.Dashboard },
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/Dashboard/DashboardPage.vue'),
        name: RouteNames.Dashboard,
      },
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
        children: [
          {
            path: '',
            component: () => import('@/pages/Fundraising/FundraisingPage.vue'),
            name: RouteNames.Fundraising,
          },
          {
            path: 'rounds',
            children: [
              {
                path: 'create',
                name: RouteNames.FundraisingRoundCreate,
                component: () => import('@/pages/Fundraising/FundraisingRoundCreatePage.vue'),
              },
              {
                path: ':id',
                name: RouteNames.FundraisingRound,
                component: () => import('@/pages/Fundraising/FundraisingRoundPage.vue'),
                props: ({ params }) => ({
                  id: parseInt(params.id as string, 10),
                }),
              },
            ],
          },
        ],
      },

    ],
  },
  {
    path: '/project',
    component: () => import('@/layouts/EmptyProjectLayout.vue'),
    children: [
      {
        path: 'create',
        component: () => import('@/pages/Project/ProjectEditPage.vue'),
        name: RouteNames.ProjectEdit,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
