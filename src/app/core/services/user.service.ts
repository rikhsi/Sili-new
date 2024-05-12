import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/typings';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #user = new BehaviorSubject<User>(null);

  get user$(): Observable<User> {
    return this.#user.asObservable();
  }

  constructor() {}
}
