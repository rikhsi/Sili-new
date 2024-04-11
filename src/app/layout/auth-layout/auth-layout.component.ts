import { ChangeDetectionStrategy, Component, OnInit, Signal, WritableSignal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoDirective } from '@ngneat/transloco';
import { BRAND, LANGUAGE, THEME } from 'src/app/constants';
import { DestroyService, LanguageService, ThemeService } from 'src/app/core/services';
import { CircleButtonComponent, SvgIconComponent } from 'src/app/shared/components';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { AsyncPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Observable, from, map, of, switchMap, takeUntil, toArray, withLatestFrom } from 'rxjs';
import { LanguageItem, ThemeItem, ThemeType } from 'src/app/typings';

@Component({
  selector: 'sili-auth-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    TranslocoDirective,
    SvgIconComponent,
    NzFlexModule,
    CircleButtonComponent,
    NgFor,
    NzDropDownModule,
    AsyncPipe,
    UpperCasePipe,
    NgIf
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.less',
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLayoutComponent implements OnInit {
  brands: Signal<typeof BRAND> = signal(BRAND);
  isTooltip: WritableSignal<boolean> = signal(true);
  currentLang$: Observable<LANGUAGE>;
  currentTheme$: Observable<ThemeType>;
  langs$: Observable<LanguageItem[]>;
  themes$: Observable<ThemeItem[]>;

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService,
    private destroy$: DestroyService
  ){}

  ngOnInit(): void {
    this.initLangs();
    this.initThemes();
  }

  onSelectLang(lang: LANGUAGE): void {
    this.languageService.onChangeLang$(lang)
    .pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  onSelectTheme(selectedTheme: string): void {
    const themeState: ThemeType = {
      current: selectedTheme as THEME,
      prev: this.themeService.theme.current
    };

    this.themeService.loadTheme$(
      themeState.current,
      themeState.prev
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  onDropdown(state: boolean): void {
    this.isTooltip.set(!state);
  }

  private initLangs(): void {
    this.currentLang$ = this.languageService.currentLang$;

    this.langs$ = this.languageService.currentLang$
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

  private initThemes(): void {
    this.currentTheme$ = this.themeService.currentTheme$;

    this.themes$ = this.themeService.currentTheme$.pipe(
      map(themeState => themeState.current),
      withLatestFrom(
        of(Object.values(THEME))
      ),
      switchMap(([
        currentTheme, 
        themeList
      ]) => (
        from(themeList).pipe(
          map(theme => ({
            theme,
            name: `theme.${theme}`,
            isSelected: currentTheme === theme
          })),
          toArray()
        )
      ))
    );
  }
}
