import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgProgressComponent, NgProgressModule } from 'ngx-progressbar';
import { DestroyService, ProgressService } from './core/services';
import { filter, takeUntil, tap } from 'rxjs';
import { AuthLayoutComponent, DashboardLayoutComponent } from './layout';

@Component({
  selector: 'sili-root',
  standalone: true,
  providers: [DestroyService],
  imports: [
    RouterOutlet,
    AuthLayoutComponent,
    DashboardLayoutComponent,
    NgProgressModule
  ],
  template: `
    <ng-progress 
      [color]="'#377E95'"
      [debounceTime]="100"
      [spinner]="false"
      [thick]="true">
    </ng-progress>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements AfterViewInit{
  @ViewChild(NgProgressComponent) progress: NgProgressComponent;

  constructor(
    private progressService: ProgressService,
    private destroy$: DestroyService
  ) {}

  ngAfterViewInit(): void {
    this.initProgress();
  }

  private initProgress(): void {
    this.progressService.status$
    .pipe(
      filter(v => v),
      tap(() => this.progress.start()),
      filter(v => !v),
      tap(() => this.progress.complete()),
      takeUntil(this.destroy$)
    )
    .subscribe();
  }

}
