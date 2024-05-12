import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';

import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { TagComponent } from '../tag/tag.component';
import { TableFieldComponent } from './components/table-field/table-field.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [TableComponent, TableHeaderComponent, TableFieldComponent],
  imports: [
    CommonModule,
    NzTableModule,
    TranslocoModule,
    SvgIconComponent,
    NzDropDownModule,
    TagComponent,
  ],
  exports: [TableComponent, TableFieldComponent],
})
export class TableModule {}
