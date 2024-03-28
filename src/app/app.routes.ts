import { Routes } from '@angular/router';
import { DASHBOARD_ROUTE, ROOT_ROUTE } from './constants';
import { authGuard, coreGuard } from './core/guards';
import { AuthLayoutComponent, DashboardLayoutComponent } from './layout';

export const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: ROOT_ROUTE.auth
    },
    {
      path: ROOT_ROUTE.auth,
      canActivate: [coreGuard],
      component: AuthLayoutComponent,
      loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
      path: ROOT_ROUTE.dashboard,
      component: DashboardLayoutComponent,
      canActivate: [authGuard],
      children: [
        {
          path: DASHBOARD_ROUTE.car,
          loadChildren: () => import('./modules/car/car.module').then(m => m.CarModule)
        },
        {
          path: DASHBOARD_ROUTE.shop,
          loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)
        },
        {
          path: DASHBOARD_ROUTE.feedback,
          loadChildren: () => import('./modules/feedback/feedback.module').then(m => m.FeedbackModule)
        },
        {
          path: DASHBOARD_ROUTE.request,
          loadChildren: () => import('./modules/request/request.module').then(m => m.RequestModule)
        },
        {
          path: DASHBOARD_ROUTE.partner,
          loadChildren: () => import('./modules/partner/partner.module').then(m => m.PartnerModule)
        }
      ]
    },
    {
      path: ROOT_ROUTE.not_found,
      loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule)
    },
    {
      path: ROOT_ROUTE.server_error,
      loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule)
    },
    {
      path: '**',
      redirectTo: ROOT_ROUTE.not_found
    }
  ];