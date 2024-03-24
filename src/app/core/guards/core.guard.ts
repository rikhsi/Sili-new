import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services';
import { ROOT_ROUTE } from 'src/app/constants';


export const coreGuard: CanActivateFn = () => {
  const storage = inject(StorageService);
  const router = inject(Router);
  
  if(storage.token) {
    router.navigate([ROOT_ROUTE.dashboard])
  }

  return true;
};
