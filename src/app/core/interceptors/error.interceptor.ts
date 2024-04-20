import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { ERROR_MESSAGE } from "src/app/constants";

import { MessageService, NavigationService, StorageService } from "../services";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const navigationService = inject(NavigationService);
    const storageService = inject(StorageService);
    const messageService = inject(MessageService);

    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
                storageService.removeToken();
                
                navigationService.onLogout().then(() => {
                    messageService.onNotifyError(
                        ERROR_MESSAGE.unauthorized
                    );
                });
            }

            if(err.status === 403) {
                messageService.onNotifyError(
                    ERROR_MESSAGE.forbidden
                );
            }

            if(err.status === 500) {
                if(storageService.token) {
                    storageService.removeToken();
                }

                navigationService.onServerErrorPage();
            }

            return throwError(() => err);
        })
    )
};