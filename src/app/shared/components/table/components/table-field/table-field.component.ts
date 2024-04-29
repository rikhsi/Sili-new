import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NzStatusColor } from 'ng-zorro-antd/core/color';
import { LINK_NAME, STATUS_COLOR, STATUS_ICON } from 'src/app/constants';
import { NZ_ICONS_TYPE, TableFieldType } from 'src/app/typings';

@Component({
  selector: 'sili-table-field',
  templateUrl: './table-field.component.html',
  styleUrl: './table-field.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFieldComponent {
  type = input<TableFieldType>();
  value = input<string>();
  statusColor = computed<NzStatusColor>(() => STATUS_COLOR[this.value()]);
  statusIcon = computed<NZ_ICONS_TYPE>(() => STATUS_ICON[this.value()]);
  hrefLink = computed<string>(() => LINK_NAME[this.type()] + this.value());
}
