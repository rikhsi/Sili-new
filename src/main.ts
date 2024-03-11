import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_INITIALIZER, importProvidersFrom, isDevMode } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideTransloco } from '@ngneat/transloco';
import { Language } from './app/constants';
import { LanguageService, StorageService, ThemeService, TranslocoHttpLoader } from './app/core/services';
import { provideServiceWorker } from '@angular/service-worker';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { jwtOptionsFactory, langFactory, themeFactory } from './app/core/utils';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { CoreInterceptor } from './app/core/interceptors';

bootstrapApplication(
  AppComponent, 
  {
    providers: [
      provideHttpClient(),
      provideRouter(routes),
      importProvidersFrom(
        AngularYandexMapsModule.forRoot({
          apikey: 'd306c0df-8591-4784-ae3e-23323936fbd4',
          lang: 'ru_RU'
        }),
        JwtModule.forRoot({
          jwtOptionsProvider: {
            provide: JWT_OPTIONS,
            useFactory: jwtOptionsFactory,
            deps: [StorageService],
          },
        }),
      ),
      provideServiceWorker('ngsw-worker.js',{
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
      }),
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
        useFactory: themeFactory,
        multi: true,
        deps: [ThemeService, StorageService],
      },
      {
        provide: APP_INITIALIZER,
        useFactory: langFactory,
        multi: true,
        deps: [LanguageService, StorageService],
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: CoreInterceptor,
        multi: true
      }
    ]
  }
);