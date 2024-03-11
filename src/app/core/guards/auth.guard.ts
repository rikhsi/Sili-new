import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../services';
import { AuthRoute, RootRoute } from 'src/app/constants';

export const authGuard: CanActivateFn = (): boolean => {
  const jwt = inject(JwtHelperService);
  const storage = inject(StorageService);
  const router = inject(Router);
  const isExpired = jwt.isTokenExpired(storage.token);

  if(isExpired) {
    storage.removeToken();
    router.navigate([RootRoute.auth, AuthRoute.login]);
  }

  return isExpired;
};