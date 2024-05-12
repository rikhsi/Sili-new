import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  constructor(private http: HttpClient) {}

  generateParams<F, U>(form: F, url: U): string {
    const urlParams = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) {
        urlParams.append(key, String(value));
      }
    });

    return url + urlParams.toString();
  }

  getQuery$<R>(url: string): Observable<R> {
    return this.http.get<R>(url);
  }

  postQuery<T, B>(url: string, data: T): Observable<B> {
    return this.http.post<B>(url, data);
  }
}
