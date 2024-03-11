import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../services';


@Injectable()
export class CoreInterceptor implements HttpInterceptor {

    constructor( private storageService: StorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storageService.token;

        if(!request.url.includes('assets')) {
            request = request.clone({
                url: environment.apiUrl + request.url,
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }
   
        return next.handle(request);
    }
}