import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_INITIALIZER, importProvidersFrom, isDevMode } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideTransloco } from '@ngneat/transloco';
import { LANGUAGE } from './app/constants';
import { LanguageService, StorageService, ThemeService, TranslocoHttpLoader } from './app/core/services';
import { provideServiceWorker } from '@angular/service-worker';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { iconFactory, jwtOptionsFactory, langFactory, themeFactory } from './app/core/utils';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { coreInterceptor, errorInterceptor, progressInterceptor } from './app/core/interceptors';
import { NzIconService } from 'ng-zorro-antd/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageService } from 'ng-zorro-antd/message';

bootstrapApplication(
  AppComponent, 
  {
    providers: [
      provideHttpClient(
        withInterceptors([
          progressInterceptor,
          coreInterceptor,
          errorInterceptor
        ])
      ),
      provideRouter(routes),
      importProvidersFrom(
        NzMessageService,
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
        BrowserAnimationsModule
      ),
      provideServiceWorker('ngsw-worker.js',{
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
      }),
      provideTransloco({
        config: {
          availableLangs: [
            LANGUAGE.ru, 
            LANGUAGE.uz, 
            LANGUAGE.en
          ],
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
      {
        provide: APP_INITIALIZER,
        useFactory: themeFactory,
        multi: true,
        deps: [
          ThemeService, 
          StorageService
        ],
      },
      {
        provide: APP_INITIALIZER,
        useFactory: langFactory,
        multi: true,
        deps: [
          LanguageService, 
          StorageService
        ],
      },
      {
        provide: APP_INITIALIZER,
        useFactory: iconFactory,
        multi: true,
        deps: [NzIconService],
      }
    ]
  }
);