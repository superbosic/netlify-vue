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
        redirect: { name: RouteNames.TokenTableTokenAllocation },
        component: () => import('@/pages/TokenTable/index.vue'),
        name: RouteNames.TokenTable,
        children: [
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
              {
                path: ':roundId/investors',
                name: RouteNames.FundraisingRoundInvestors,
                component: () => import('@/pages/Fundraising/FundraisingRoundInvestorsPage.vue'),
                props: ({ params }) => ({
                  roundId: parseInt(params.roundId as string, 10),
                }),
              },
            ],
          },
        ],
      },
      {
        path: 'document',
        children: [
          {
            path: 'upload/:id',
            component: () => import('@/pages/Document/DocumentUploadPage.vue'),
            name: RouteNames.DocumentUpload,
            props: true,
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
        path: 'edit',
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
