import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardLayoutService } from './services';
import { DashboardMenuItem } from 'src/app/typings';
import { Observable } from 'rxjs';


@Component({
  selector: 'sili-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardLayoutService]
})
export class DashboardLayoutComponent {
  menuItems$: Observable<DashboardMenuItem[]>;

  constructor(private dashboardLayoutService: DashboardLayoutService){}

  ngOnInit(): void {
    this.menuItems$ = this.dashboardLayoutService.menuItems$;
  }

  onSelectMenuItem(): void {}

}
