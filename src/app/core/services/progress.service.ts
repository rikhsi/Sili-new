import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { ThemeService } from './theme.service';
import { THEME } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  #status = new BehaviorSubject<boolean>(false);
  status$: Observable<boolean> = this.#status.asObservable();

  statusColor$: Observable<string> = this.themeService.currentTheme$.pipe(
    map(state => {
      const isDefault = state.current === THEME.default;

      return isDefault ? '#377E95' : '#913DF3';
    }),
    take(1)
  );

  constructor(private themeService: ThemeService){}

  set status(state: boolean) {
    this.#status.next(state);
  }
}
