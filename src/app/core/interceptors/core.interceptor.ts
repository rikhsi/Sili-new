import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProgressService, StorageService } from '../services';


@Injectable()
export class CoreInterceptor implements HttpInterceptor {

    constructor( 
        private storageService: StorageService,
        private progressService: ProgressService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.progressService.status = true;

        const token = this.storageService.token;

        if(!request.url.includes('assets')) {
            request = request.clone({
                url: environment.apiUrl + request.url,
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        this.progressService.status = false;

        return next.handle(request);
    }
}