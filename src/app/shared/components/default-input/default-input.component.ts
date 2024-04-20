import { ChangeDetectionStrategy, Component, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSizeLDSType, NzValidateStatus } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FunctionType } from 'src/app/typings';

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
  value = model<string>();
  required = input<boolean>();
  label = input<string>();
  labelWrap = input<boolean>(true);
  size = input<NzSizeLDSType>('large');
  status = input<NzValidateStatus>("");
  isFeedback = input<boolean>();
  message = input<string>();
  type = input<string>('text');
  autocomplete = input<string>();
  disabled = signal<boolean>(false);

  onChange: FunctionType = () => {};
  onTouched: FunctionType = () => {};

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: FunctionType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: FunctionType): void {
    this.onTouched = fn;
  }

  setDisabledState(state: boolean): void {
    this.disabled.set(state);
  }

  onModelChange($event: string): void {
    this.onChange($event.toString().trim());
  }
}
