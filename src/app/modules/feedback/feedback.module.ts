import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SvgIconComponent } from 'src/app/shared/components';

import { FeedbackStatisticsComponent } from './components/feedback-statistics/feedback-statistics.component';
import { FeedbackTableComponent } from './components/feedback-table/feedback-table.component';
import { FeedbackComponent } from './feedback.component';
import { FeedbackRoutingModule } from './feedback-routing.module';

@NgModule({
  declarations: [FeedbackComponent, FeedbackTableComponent, FeedbackStatisticsComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    NzTableModule,
    TranslocoModule,
    SvgIconComponent,
    NzDropDownModule,
  ],
})
export class FeedbackModule {}
