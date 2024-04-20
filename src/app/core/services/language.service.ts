import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { 
  BehaviorSubject, 
  catchError, 
  EMPTY, 
  first, 
  from, 
  map, 
  Observable, 
  of, 
  startWith, 
  switchMap, 
  tap, 
  toArray, 
  withLatestFrom 
} from 'rxjs';
import { ERROR_MESSAGE, LANGUAGE, LANGUAGE_LOCALE, SUCCESS_MESSAGE } from 'src/app/constants';
import { LanguageItem } from 'src/app/typings';

import { MessageService } from './message.service';
import { MetaService } from './meta.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  #currentLang = new BehaviorSubject<LANGUAGE>(null);

  get currentLang$(): Observable<LANGUAGE> {
    return this.#currentLang.asObservable();
  }

  get langItems$(): Observable<LanguageItem[]> {
    return this.currentLang$
    .pipe(
      withLatestFrom(
        of(Object.values(LANGUAGE))
      ),
      switchMap(([currentLang, langList]) => {
        return from(langList).pipe(
          map(lang => ({
            name: lang,
            isSelected: currentLang === lang
          })),
          toArray()
        )
      })
    );
  }

  constructor(
    private translocoService: TranslocoService,
    private storageService: StorageService,
    private i18nService: NzI18nService,
    private metaService: MetaService,
    private messageService: MessageService
  ) { }

  onChangeLang$(
    lang: LANGUAGE, 
    isMessage: boolean = true
  ): Observable<string> {    
    return this.translocoService.setActiveLang(lang).events$
    .pipe(
      startWith({}),
      first(),
      switchMap(() => (
        this.metaService.updateTitle$()
      )),
      tap(() => {
        this.langChangeSuccess(lang, isMessage);
      }),
      catchError(() => (
        this.langChangeError$()
      )),
    );
  }

  private langChangeSuccess(
    lang: LANGUAGE, 
    isMessage: boolean
  ): void {
    this.#currentLang.next(lang);
    this.i18nService.setLocale(
      LANGUAGE_LOCALE[lang]
    );
    this.metaService.updateLocale(lang);
  
    this.storageService.lang = lang; 

    if(isMessage) {
      this.messageService.onNotifySuccess(
        SUCCESS_MESSAGE.lang
      );
    }
  }

  private langChangeError$(): Observable<never> {
    this.messageService.onNotifyError(
      ERROR_MESSAGE.lang
    );

    return EMPTY;
  }
}
