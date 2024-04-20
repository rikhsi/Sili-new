import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SvgIconComponent } from 'src/app/shared/components';

import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { DashboardLayoutComponent } from './dashboard-layout.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent, 
    DashboardHeaderComponent, 
    DashboardMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule, 
    NzMenuModule,
    SvgIconComponent, 
    NzIconModule,
    TranslocoModule,
    NzFlexModule
  ]
})
export class DashboardLayoutModule { }
