import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { NgProgressComponent, NgProgressModule } from 'ngx-progressbar';
import { map, Observable } from 'rxjs';

import { ProgressService, ThemeService } from './core/services';
import { AuthLayoutComponent, DashboardLayoutModule } from './layout';

@Component({
  selector: 'sili-root',
  standalone: true,
  imports: [RouterOutlet, AuthLayoutComponent, DashboardLayoutModule, NgProgressModule, AsyncPipe],
  template: `
    <ng-progress
      [ariaLabel]="'progress'"
      [color]="statusColor$ | async"
      [spinner]="false"
      [thick]="true"
    ></ng-progress>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(NgProgressComponent) progress: NgProgressComponent;

  statusColor$: Observable<string>;

  constructor(
    private progressService: ProgressService,
    private themeService: ThemeService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.statusColor$ = this.themeService.primaryColor$;
  }

  ngAfterViewInit(): void {
    this.initProgress();
  }

  private initProgress(): void {
    this.progressService.status$
      .pipe(
        map((status) => {
          if (status) {
            this.progress.start();
          } else {
            this.progress.complete();
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
