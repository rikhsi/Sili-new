import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LINK_NAME } from 'src/app/constants';
import { TableFieldType, TimeType } from 'src/app/typings';

@Component({
  selector: 'sili-table-field',
  templateUrl: './table-field.component.html',
  styleUrl: './table-field.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFieldComponent<T> {
  type = input<TableFieldType>();
  value = input<T>();
  hrefLink = computed<string>(() => LINK_NAME[this.type()] + this.value());
  time = computed<TimeType>(() => this.value() as TimeType);
}
