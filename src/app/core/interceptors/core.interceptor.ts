import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from 'src/environments/environment';

import { StorageService } from '../services';

export const coreInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);
  const token = storage.token;
  const headers = req.url.includes('auth') ? `Bearer ${token}` : null;

  if (!req.url.includes('assets')) {
    req = req.clone({
      url: environment.apiUrl + req.url,
      setHeaders: {
        Authorization: headers,
      },
    });
  }

  return next(req);
};
