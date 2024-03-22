import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzSizeLDSType, NzValidateStatus } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'sili-default-input',
  standalone: true,
  imports: [NzFormModule, NzInputModule],
  templateUrl: './default-input.component.html',
  styleUrl: './default-input.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultInputComponent {
  @Input() required: boolean;
  @Input() label: string;
  @Input() labelWrap: boolean = true;
  @Input() noColon: boolean = true;
  @Input() size: NzSizeLDSType = 'large';
  @Input() status: NzValidateStatus;
  @Input() isFeedback: boolean;
  @Input() message: string;
}
