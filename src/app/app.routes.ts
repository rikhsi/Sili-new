import { Routes } from '@angular/router';
import { DashboardRoute, RootRoute } from './constants';
import { authGuard } from './core/guards';
import { AuthLayoutComponent, DashboardLayoutComponent } from './layout';

export const routes: Routes = [
    {
      path: RootRoute.auth,
      component: AuthLayoutComponent,
      loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
      path: RootRoute.dashboard,
      component: DashboardLayoutComponent,
      canActivate: [authGuard],
      children: [
        {
          path: DashboardRoute.car,
          loadChildren: () => import('./modules/car/car.module').then(m => m.CarModule)
        },
        {
          path: DashboardRoute.shop,
          loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)
        },
        {
          path: DashboardRoute.feedback,
          loadChildren: () => import('./modules/feedback/feedback.module').then(m => m.FeedbackModule)
        },
        {
          path: DashboardRoute.request,
          loadChildren: () => import('./modules/request/request.module').then(m => m.RequestModule)
        },
        {
          path: DashboardRoute.partner,
          loadChildren: () => import('./modules/partner/partner.module').then(m => m.PartnerModule)
        }
      ]
    },
    {
      path: RootRoute.access_error,
      loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule)
    },
    {
      path: RootRoute.not_found,
      loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule)
    },
    {
      path: RootRoute.server_error,
      loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule)
    },
    {
      path: '**',
      redirectTo: RootRoute.auth
    }
  ];