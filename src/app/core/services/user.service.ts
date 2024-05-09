import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #user = new BehaviorSubject<any>(null);

  get user$(): Observable<any> {
    return this.#user.asObservable();
  }

  constructor() {}
}
