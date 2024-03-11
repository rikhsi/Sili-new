import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Observable } from 'rxjs';
import { LANGUAGE_LOCALE, Language } from 'src/app/constants';
import { StorageService } from './storage.service';
import { NzI18nService } from 'ng-zorro-antd/i18n';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  #currentLang = new BehaviorSubject<Language>(null);
  currentLang$: Observable<Language> = this.#currentLang.asObservable();
  
  constructor(
    private translocoService: TranslocoService,
    private storageService: StorageService,
    private i18nService: NzI18nService
  ) { }

  onChangeLang(lang: Language): void {  
    this.#currentLang.next(lang);
    this.translocoService.setActiveLang(lang);
    this.storageService.lang = lang;
    this.i18nService.setLocale(LANGUAGE_LOCALE[lang]);
  }
}
