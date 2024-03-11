import { APP_INITIALIZER, NgModule } from '@angular/core';
import { StorageService, ThemeService } from '../services';
import { Theme } from 'src/app/constants';
import { Observable } from 'rxjs';
import { ThemeType } from 'src/app/typings';

export function themeFactory(
  themeService: ThemeService, 
  storageService: StorageService
): () => Observable<ThemeType> {
  const storageTheme = storageService.theme ?? Theme.default;

  return () => themeService.loadTheme(storageTheme, null);
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: themeFactory,
      deps: [ThemeService, StorageService],
    }
  ]
})
export class ThemeModule { }
