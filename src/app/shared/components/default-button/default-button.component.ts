import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NzButtonModule, NzButtonType } from 'ng-zorro-antd/button';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'sili-default-button',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultButtonComponent {
  size = input<NzSizeLDSType>();
  danger = input<boolean>();
  blocked = input<boolean>();
  ghost = input<boolean>();
  loading = input<boolean>();
  mode = input<NzButtonType>();
  block = input<boolean>();
  clicked = output<void>();
}
