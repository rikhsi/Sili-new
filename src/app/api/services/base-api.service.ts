import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(private http: HttpClient) { }

  postQuery<T, B>(url: string, data: T): Observable<B> {
    return this.http.post<B>(url, data);
  }
}
