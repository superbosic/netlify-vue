import { RouteParams, useRoute } from 'vue-router';
import { computed } from 'vue';
import { RouteNames } from '@/router/routeNames';

interface IQuery {
    [key: string]: string
}

export interface INavigationMenuItem {
    routeName?: RouteNames;
    params?: RouteParams;
    query?: IQuery;
    icon?: string;
    items?: INavigationMenuItem[];
    label?: string;
}

const menuItems: INavigationMenuItem[] = [
  {
    routeName: RouteNames.Dashboard,
    icon: 'home',
    label: 'Dashboard',
  },
  // {
  //   routeName: RouteNames.TokenTable,
  //   icon: 'attach_money',
  //   label: 'Token Table',
  // },
  // {
  //   routeName: RouteNames.Fundraising,
  //   icon: 'savings',
  //   label: 'Fundraising',
  // },
  // {
  //   routeName: RouteNames.Tasks,
  //   icon: 'edit_square',
  //   label: 'Tasks',
  // },
  {
    routeName: RouteNames.Portfolio,
    icon: 'subject',
    label: 'Portfolio',
  },
];

export function useMenu() {
  const route = useRoute();
  const currentMenuItem = computed(() => menuItems.find(({ routeName }) => routeName === route.name));
  const currentMenuLabel = computed(() => currentMenuItem.value?.label ?? '');

  return {
    menuItems,
    currentMenuItem,
    currentMenuLabel,
  };
}
