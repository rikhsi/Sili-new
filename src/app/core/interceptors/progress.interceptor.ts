import { HttpInterceptorFn } from "@angular/common/http";
import { ProgressService } from "../services";
import { finalize } from "rxjs";
import { inject } from "@angular/core";

export const progressInterceptor: HttpInterceptorFn = (req, next) => {
    const progress = inject(ProgressService);

    progress.status = true;

    return next(req).pipe(
        finalize(() => progress.status = false)
    )
  };