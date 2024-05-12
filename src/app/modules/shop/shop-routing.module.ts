import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SHOP_ROUTE } from 'src/app/constants';

const routes: Routes = [
  {
    path: SHOP_ROUTE.home,
    loadChildren: () => import('./pages/shop-home/shop-home.module').then((m) => m.ShopHomeModule),
  },
  {
    path: SHOP_ROUTE.detail,
    loadChildren: () =>
      import('./pages/shop-detail/shop-detail.module').then((m) => m.ShopDetailModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: SHOP_ROUTE.home,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
