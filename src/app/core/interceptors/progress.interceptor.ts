import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

import { ProgressService } from '../services';

export const progressInterceptor: HttpInterceptorFn = (req, next) => {
  const progress = inject(ProgressService);

  progress.status = true;

  return next(req).pipe(finalize(() => (progress.status = false)));
};
