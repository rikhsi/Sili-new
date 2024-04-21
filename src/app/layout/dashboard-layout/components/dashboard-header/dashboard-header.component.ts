import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BRAND } from 'src/app/constants';

@Component({
  selector: 'sili-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeaderComponent {
  readonly brands = signal<typeof BRAND>(BRAND);
}
