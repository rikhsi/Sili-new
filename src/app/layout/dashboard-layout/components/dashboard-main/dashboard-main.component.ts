import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DashboardMenuItem } from 'src/app/typings';

@Component({
  selector: 'sili-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMainComponent {
  menuItems = input<DashboardMenuItem[]>();
  clicked = output<void>();
}
