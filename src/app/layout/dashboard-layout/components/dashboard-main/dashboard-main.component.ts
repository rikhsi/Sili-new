import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'sili-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardMainComponent {
  siderWidth: WritableSignal<string> = signal('250px');
}
