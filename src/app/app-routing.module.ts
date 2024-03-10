import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoute, RootRoute } from './constants';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: RootRoute.auth,
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
    path: '**',
    redirectTo: RootRoute.auth
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
