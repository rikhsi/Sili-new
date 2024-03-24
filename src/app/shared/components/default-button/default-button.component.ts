import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzButtonModule, NzButtonType } from 'ng-zorro-antd/button';

@Component({
  selector: 'sili-default-button',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultButtonComponent {
  @Input() size: NzSizeLDSType;
  @Input() danger: boolean;
  @Input() blocked: boolean;
  @Input() ghost: boolean;
  @Input() loading: boolean;
  @Input() mode: NzButtonType;
  @Input() block: boolean;
  @Output() clicked = new EventEmitter<void>();
}
