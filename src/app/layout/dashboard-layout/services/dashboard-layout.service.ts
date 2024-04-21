import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DASHBOARD_ROUTE } from 'src/app/constants';
import { DashboardMenuItem } from 'src/app/typings';

@Injectable()
export class DashboardLayoutService {
  #menuItems = new BehaviorSubject<DashboardMenuItem[]>(this.initMenuItems());

  get menuItems$(): Observable<DashboardMenuItem[]> {
    return this.#menuItems.asObservable();
  }

  private initMenuItems(): DashboardMenuItem[] {
    return [
      {
        title: 'menu.shop',
        icon: 'shop',
        route: DASHBOARD_ROUTE.shop,
      },
      {
        title: 'menu.car',
        icon: 'car',
        route: DASHBOARD_ROUTE.car,
      },
      {
        title: 'menu.partner',
        icon: 'team',
        route: DASHBOARD_ROUTE.partner,
      },
      {
        title: 'menu.request',
        icon: 'message',
        route: DASHBOARD_ROUTE.request,
      },
      {
        title: 'menu.feedback',
        icon: 'phone',
        route: DASHBOARD_ROUTE.feedback,
      },
      {
        title: 'menu.settings',
        icon: 'setting',
        route: DASHBOARD_ROUTE.settings,
      },
    ];
  }
}
