import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardLayoutService } from './services';
import { DashboardMenuItem } from 'src/app/typings';
import { Observable, Subject, map, switchMap, takeUntil, withLatestFrom } from 'rxjs';
import { DestroyService, LanguageService } from 'src/app/core/services';
import { LANGUAGE } from 'src/app/constants';

@Component({
  selector: 'sili-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardLayoutService, DestroyService]
})
export class DashboardLayoutComponent {
  menuItems$: Observable<DashboardMenuItem[]>;
  currentLang$: Observable<LANGUAGE>;

  private languageChange$ = new Subject<void>();

  constructor(
    private dashboardLayoutService: DashboardLayoutService,
    private languageService: LanguageService,
    private destroy$: DestroyService
  ){}

  ngOnInit(): void {
    this.menuItems$ = this.dashboardLayoutService.menuItems$;
    this.currentLang$ = this.languageService.currentLang$;

    this.setupLanguageSwitching();
  }

  private setupLanguageSwitching(): void {
    this.languageChange$
    .pipe(
      withLatestFrom(this.currentLang$),
      map(([_, currentLang]) => {
        switch (currentLang) {
          case LANGUAGE.uz:
            return LANGUAGE.ru;
          case LANGUAGE.ru:
            return LANGUAGE.en;
          case LANGUAGE.en:
          default:
            return LANGUAGE.uz;
        }
      }),
      switchMap(nextLang => (
        this.languageService.onChangeLang$(
          nextLang
        )
      )),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  onSelectMenuItem(): void {}

  onToggleLang(): void {
     this.languageChange$.next();
  }

}
