import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardMenuItem } from 'src/app/typings';

import { DashboardLayoutService } from './services';

@Component({
  selector: 'sili-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardLayoutService],
})
export class DashboardLayoutComponent implements OnInit {
  menuItems$: Observable<DashboardMenuItem[]>;

  constructor(private dashboardLayoutService: DashboardLayoutService) {}

  ngOnInit(): void {
    this.menuItems$ = this.dashboardLayoutService.menuItems$;
  }

  onSelectMenuItem(): void {}
}
