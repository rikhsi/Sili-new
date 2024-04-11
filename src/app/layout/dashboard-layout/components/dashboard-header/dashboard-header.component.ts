import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal, signal } from '@angular/core';
import { BRAND, LANGUAGE } from 'src/app/constants';
import { NZ_ICONS_TYPE } from 'src/app/typings';

@Component({
  selector: 'sili-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent {
  @Input() currentLang: LANGUAGE;
  @Input() currentThemeIcon: NZ_ICONS_TYPE;
  @Output() langClick = new EventEmitter<void>();

  brands: Signal<typeof BRAND> = signal(BRAND);
}
