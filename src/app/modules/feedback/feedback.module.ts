import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TableModule } from 'src/app/shared/components';

import { FeedbackComponent } from './feedback.component';
import { FeedbackRoutingModule } from './feedback-routing.module';
@NgModule({
  declarations: [FeedbackComponent],
  imports: [CommonModule, FeedbackRoutingModule, TableModule, NgApexchartsModule, NzGridModule],
})
export class FeedbackModule {}
