import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableHeaderCol } from 'src/app/typings';

@Component({
  selector: 'sili-table-header',
  templateUrl: './table-header.component.html',
  styleUrl: './table-header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderComponent<T> {
  tableCols = input<TableHeaderCol<T>[]>();
}
