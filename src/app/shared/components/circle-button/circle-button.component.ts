import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'sili-circle-button',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './circle-button.component.html',
  styleUrl: './circle-button.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleButtonComponent {
  @Input() size: NzSizeLDSType = 'default';
  @Input() danger: boolean;
  @Input() blocked: boolean;
  @Input() ghost: boolean;
  @Input() loading: boolean;
}
