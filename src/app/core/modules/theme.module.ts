import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ThemeService } from '../services';
import { Theme } from 'src/app/constants';
import { Observable } from 'rxjs';
import { ThemeType } from 'src/app/typings';

export function themeFactory(themeService: ThemeService): () => Observable<ThemeType> {
  return () => themeService.loadTheme(Theme.default, null);
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: themeFactory,
      deps: [ThemeService],
    }
  ]
})
export class ThemeModule { }
