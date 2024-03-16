import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { ProgressService, } from '../services';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {

    constructor( private progressService: ProgressService ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(() => this.progressService.status = true),
            finalize(() => this.progressService.status = false)
        )
    }
}