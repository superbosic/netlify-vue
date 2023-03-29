import { RouteParams } from 'vue-router';
import { RouteNames } from '@/router/routeNames';

interface IQuery {
    [key: string]: string
}

export interface INavigationMenuItem {
    routeName: RouteNames;
    params?: RouteParams;
    query?: IQuery;
    icon?: string;
    items?: INavigationMenuItem[];
    label?: string;
}

export const menuItems: INavigationMenuItem[] = [
  {
    routeName: RouteNames.TokenTable,
    icon: 'attach_money',
    label: 'Token Table',
  },
];
