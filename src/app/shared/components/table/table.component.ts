import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NzTablePaginationType, NzTableQueryParams } from 'ng-zorro-antd/table';
import { TableHeaderCol } from 'src/app/typings';

@Component({
  selector: 'sili-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<C, D> {
  isLoading = input<boolean>();
  tableData = input<D[]>();
  tableCols = input<TableHeaderCol<C>[]>();
  pageSizeOptions = input<number[]>([10, 30, 50]);
  totalItems = input<number>(100);
  isSizeChanger = input<boolean>();
  customBody = input<boolean>();
  paginationType = input<NzTablePaginationType>();
  onQueryChange = output<NzTableQueryParams>();
}
