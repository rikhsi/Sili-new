import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule, NzButtonType } from 'ng-zorro-antd/button';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzToolTipModule, NzTooltipTrigger } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'sili-circle-button',
  standalone: true,
  imports: [NzButtonModule, NzToolTipModule],
  templateUrl: './circle-button.component.html',
  styleUrl: './circle-button.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleButtonComponent {
  @Input() size: NzSizeLDSType;
  @Input() danger: boolean;
  @Input() blocked: boolean;
  @Input() ghost: boolean;
  @Input() loading: boolean;
  @Input() type: NzButtonType;
  @Input() ariaLabel: string;
  @Input() tooltipText: string;
  @Input() tooltipTrigger: NzTooltipTrigger = 'hover';
  @Input() tooltipArrow: boolean;
  @Input() tooltipMouseEnterDelay: number = 1;
  @Input() isTooltip: boolean = false;
  @Output() clicked = new EventEmitter<void>();
}
