import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NzButtonModule, NzButtonType } from 'ng-zorro-antd/button';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzToolTipModule, NzTooltipTrigger } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'sili-circle-button',
  standalone: true,
  imports: [NzButtonModule, NzToolTipModule],
  templateUrl: './circle-button.component.html',
  styleUrl: './circle-button.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircleButtonComponent {
  size = input<NzSizeLDSType>();
  danger = input<boolean>();
  blocked = input<boolean>();
  ghost = input<boolean>();
  loading = input<boolean>();
  mode = input<NzButtonType>();
  ariaLabel = input<string>();
  tooltipText = input<string>();
  tooltipTrigger = input<NzTooltipTrigger>('hover');
  tooltipArrow = input<boolean>();
  tooltipMouseEnterDelay = input<number>(1);
  isTooltip = input<boolean>(false);
  clicked = output<void>();

  tooltipTitle = computed(() => (this.isTooltip() ? this.tooltipText() : null));
}
