import {
  provideTransloco,
  Translation,
  TranslocoLoader,
  TranslocoModule
} from '@ngneat/transloco';
import { inject, Injectable, isDevMode, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { Language } from 'src/app/constants';

registerLocaleData(ru);

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
          defaultLang: Language.ru,
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
      { provide: NZ_I18N, useValue: ru_RU }
  ],
})
export class LanguageModule {}
