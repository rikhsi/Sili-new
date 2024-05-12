import { ROUTE_PARAM } from './param';

export enum AUTH_ROUTE {
  login = 'login',
  recover = 'recover',
}

export enum SHOP_ROUTE {
  home = 'all',
  detail = `:${ROUTE_PARAM.shopID}`,
}

export enum DASHBOARD_ROUTE {
  car = 'car',
  shop = 'shop',
  partner = 'partner',
  request = 'request',
  feedback = 'feedback',
  settings = 'settings',
  profile = 'profile',
}
