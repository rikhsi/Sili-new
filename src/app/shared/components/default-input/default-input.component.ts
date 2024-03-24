import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSizeLDSType, NzValidateStatus } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'sili-default-input',
  standalone: true,
  imports: [NzFormModule, NzInputModule, FormsModule],
  templateUrl: './default-input.component.html',
  styleUrl: './default-input.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DefaultInputComponent),
      multi: true
    }
  ]
})
export class DefaultInputComponent implements ControlValueAccessor {
  @Input() value: string;
  @Input() required: boolean;
  @Input() label: string;
  @Input() labelWrap: boolean = true;
  @Input() noColon: boolean = true;
  @Input() size: NzSizeLDSType = 'large';
  @Input() status: NzValidateStatus;
  @Input() isFeedback: boolean;
  @Input() message: string;
  @Input() blocked: boolean;
  @Input() type: string = 'text';

  onChange: Function = () => {};
  onTouched: Function = () => {};

  constructor(private cdr: ChangeDetectorRef){}

  writeValue(value: string): void {
    this.value = value;

    this.cdr.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState(state: boolean): void {
    this.blocked = state;
  }

  onModelChange($event: string): void {
    this.onChange($event.toString().trim());
  }
}
