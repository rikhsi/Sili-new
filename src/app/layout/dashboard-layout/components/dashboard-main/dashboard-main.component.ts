import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DashboardMenuItem } from 'src/app/typings';

@Component({
  selector: 'sili-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardMainComponent {
  @Input() menuItems: DashboardMenuItem[];
  @Output() clicked = new EventEmitter<void>();
}
