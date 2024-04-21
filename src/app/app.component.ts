import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgProgressComponent, NgProgressModule } from 'ngx-progressbar';
import { map, Observable, takeUntil } from 'rxjs';

import { DestroyService, ProgressService, ThemeService } from './core/services';
import { AuthLayoutComponent, DashboardLayoutModule } from './layout';

@Component({
  selector: 'sili-root',
  standalone: true,
  providers: [DestroyService],
  imports: [RouterOutlet, AuthLayoutComponent, DashboardLayoutModule, NgProgressModule, AsyncPipe],
  template: `
    <ng-progress [ariaLabel]="'progress'" [color]="statusColor$ | async" [spinner]="false" [thick]="true"></ng-progress>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(NgProgressComponent) progress: NgProgressComponent;

  statusColor$: Observable<string>;

  constructor(
    private progressService: ProgressService,
    private destroy$: DestroyService,
    private themeService: ThemeService,
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
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
