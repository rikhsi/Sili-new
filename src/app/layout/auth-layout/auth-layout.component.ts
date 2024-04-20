import { AsyncPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoDirective } from '@ngneat/transloco';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { Observable, Subject, switchMap, takeUntil} from 'rxjs';
import { BRAND, LANGUAGE, THEME } from 'src/app/constants';
import { DestroyService, LanguageService, ThemeService } from 'src/app/core/services';
import { CircleButtonComponent, SvgIconComponent } from 'src/app/shared/components';
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
  brands = signal<typeof BRAND>(BRAND);
  isTooltip = signal<boolean>(true);

  currentLang$: Observable<LANGUAGE>;
  currentTheme$: Observable<ThemeType>;
  langList$: Observable<LanguageItem[]>;
  themeList$: Observable<ThemeItem[]>;
  
  readonly langEmit$ = new Subject<LANGUAGE>();
  readonly themeEmit$ = new Subject<THEME>();

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService,
    private destroy$: DestroyService
  ){}

  ngOnInit(): void {
    this.initLang();
    this.initTheme(); 
  }

  onSelectLang(selectedLang: LANGUAGE): void {
    this.langEmit$.next(selectedLang);
  }

  onSelectTheme(selectedTheme: THEME): void {
    this.themeEmit$.next(selectedTheme);
  }

  onDropdown(state: boolean): void {
    this.isTooltip.set(!state);
  }

  private initLang(): void {
    this.currentLang$ = this.languageService.currentLang$;
    this.langList$ = this.languageService.langItems$;

    this.langEmit$
    .pipe(
      switchMap((lang) => (
        this.languageService.onChangeLang$(lang)
      )),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private initTheme(): void {
    this.currentTheme$ = this.themeService.currentTheme$;
    this.themeList$ = this.themeService.themeList$;

    this.themeEmit$
    .pipe(
      switchMap((theme) => (
        this.themeService.loadTheme$(theme)
      )),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
