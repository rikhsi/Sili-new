import { ChangeDetectionStrategy, Component, OnInit, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { BRAND, LANGUAGE, THEME } from 'src/app/constants';
import { DestroyService, LanguageService, ThemeService } from 'src/app/core/services';
import { CircleButtonComponent, SvgIconComponent } from 'src/app/shared/components';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { AsyncPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Observable, takeUntil } from 'rxjs';
import { LanguageItem, ThemeItem, ThemeType } from 'src/app/typings';
import { AuthLayoutService } from './auth-layout.service';

@Component({
  selector: 'sili-auth-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    TranslocoPipe,
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
  providers: [AuthLayoutService, DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLayoutComponent implements OnInit {
  brands: Signal<typeof BRAND> = signal(BRAND);
  currentLang$: Observable<LANGUAGE>;
  currentTheme$: Observable<ThemeType>;
  themes$: Observable<ThemeItem[]>;
  langs$: Observable<LanguageItem[]>;

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService,
    private destroy$: DestroyService,
    private authLayoutService: AuthLayoutService
  ){}

  ngOnInit(): void {
    this.currentLang$ = this.languageService.currentLang$;
    this.currentTheme$ = this.themeService.currentTheme$;
    this.langs$ = this.authLayoutService.langs$;
    this.themes$ = this.authLayoutService.themes$;
  }

  onSelectLang(lang: LANGUAGE): void {
    this.languageService.onChangeLang(lang);
  }

  onSelectTheme(selectedTheme: string): void {
    const themeState: ThemeType = {
      current: selectedTheme as THEME,
      prev: this.themeService.theme.current
    }

    this.themeService.loadTheme(
      themeState.current,
      themeState.prev
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
