import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SvgIconComponent } from 'src/app/shared/components';
import { RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [DashboardLayoutComponent, DashboardHeaderComponent, DashboardMainComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule, 
    NzMenuModule,
    SvgIconComponent, 
    NzIconModule,
    TranslocoModule
  ]
})
export class DashboardLayoutModule { }
