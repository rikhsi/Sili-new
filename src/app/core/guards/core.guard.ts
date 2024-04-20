import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROOT_ROUTE } from 'src/app/constants';

import { StorageService } from '../services';


export const coreGuard: CanActivateFn = () => {
  const storage = inject(StorageService);
  const router = inject(Router);
  
  if(storage.token) {
    router.navigate([ROOT_ROUTE.dashboard])
  }

  return true;
};
