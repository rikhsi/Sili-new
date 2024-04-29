import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  input,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzFilterTriggerComponent } from 'ng-zorro-antd/table';
import { TableHeaderCol } from 'src/app/typings';

@Component({
  selector: 'sili-table-header',
  templateUrl: './table-header.component.html',
  styleUrl: './table-header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderComponent<T> implements AfterViewInit {
  @ViewChild('searchMenu') searchMenu: NzDropdownMenuComponent;
  @ViewChild('selectMenu') selectMenu: NzDropdownMenuComponent;
  @ViewChildren('trigger') triggers: NzFilterTriggerComponent[];

  tableCols = input<TableHeaderCol<T>[]>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.attachMenu();
  }

  private attachMenu(): void {
    this.triggers.forEach((trigger) => {
      trigger.nzDropdownMenu = this.searchMenu;
    });

    this.cdr.markForCheck();
  }
}
