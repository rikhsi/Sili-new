import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoute } from 'src/app/constants';

const routes: Routes = [
  {
    path: AuthRoute.login,
    loadChildren: () => import('./page/login/login.module').then(m => m.LoginModule)
  },
  {
    path: AuthRoute.recover,
    loadChildren: () => import('./page/recover/recover.module').then(m => m.RecoverModule)
  },
  {
    path: '**',
    redirectTo: AuthRoute.login
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
