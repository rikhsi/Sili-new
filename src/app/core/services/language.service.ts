import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Observable } from 'rxjs';
import { LANGUAGE, LANGUAGE_LOCALE } from 'src/app/constants';
import { StorageService } from './storage.service';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { MetaService } from './meta.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  #currentLang = new BehaviorSubject<LANGUAGE>(null);
  currentLang$: Observable<LANGUAGE> = this.#currentLang.asObservable();
  
  constructor(
    private translocoService: TranslocoService,
    private storageService: StorageService,
    private i18nService: NzI18nService,
    private metaService: MetaService
  ) { }

  onChangeLang(lang: LANGUAGE): void {  
    this.#currentLang.next(lang);
    this.translocoService.setActiveLang(lang);
    this.storageService.lang = lang;
    this.i18nService.setLocale(LANGUAGE_LOCALE[lang]);
    this.metaService.updateLocale(lang);
  }
}
