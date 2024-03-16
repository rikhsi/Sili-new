import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  #status = new BehaviorSubject<boolean>(false);
  status$: Observable<boolean> = this.#status.asObservable();

  set status(state: boolean) {
    this.#status.next(state);
  }
}
