import { Injectable } from '@angular/core';
import { Observable, from, map, of, switchMap, toArray, withLatestFrom } from 'rxjs';
import { LANGUAGE, THEME } from 'src/app/constants';
import { LanguageService, ThemeService } from 'src/app/core/services';
import { LanguageItem, ThemeItem } from 'src/app/typings';

@Injectable()
export class AuthLayoutService {

  get langs$(): Observable<LanguageItem[]> {
    return this.languageService.currentLang$.pipe(
      withLatestFrom(of(Object.values(LANGUAGE))),
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

  get themes$(): Observable<ThemeItem[]> {
    return this.themeService.currentTheme$.pipe(
      map(themeState => themeState.current),
      withLatestFrom(of(Object.values(THEME))),
      switchMap(([currentTheme, themeList]) => {
        return from(themeList).pipe(
          map(theme => ({
            theme,
            name: `theme.${theme}`,
            isSelected: currentTheme === theme
          })),
          toArray()
        )
      })
    )
  }

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService
  ) { }

}
