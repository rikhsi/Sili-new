import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_ROUTE } from 'src/app/constants';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AUTH_ROUTE.login
  },
  {
    path: AUTH_ROUTE.login,
    loadChildren: () => import('./page/login/login.module').then(m => m.LoginModule)
  },
  {
    path: AUTH_ROUTE.recover,
    loadChildren: () => import('./page/recover/recover.module').then(m => m.RecoverModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
