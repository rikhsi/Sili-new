import {
  provideTransloco,
  Translation,
  TranslocoLoader,
  TranslocoModule
} from '@ngneat/transloco';
import { APP_INITIALIZER, inject, Injectable, isDevMode, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Language } from 'src/app/constants';
import { Observable } from 'rxjs';
import { LanguageService, StorageService } from '../services';

export function langFactory(
  langService: LanguageService, 
  storageService: StorageService
): () => Observable<Language> {
  const lang = storageService.lang ?? Language.ru;

  langService.onChangeLang(lang);

  return () => langService.currentLang$;
}

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    private http = inject(HttpClient);

    getTranslation(lang: Language) {
        return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
    }
}

@NgModule({
  exports: [ TranslocoModule ],
  providers: [
      provideTransloco({
        config: {
          availableLangs: [Language.ru, Language.uz, Language.en],
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
      {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: langFactory,
        deps: [LanguageService, StorageService],
      }
  ],
})
export class LanguageModule {}
