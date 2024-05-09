import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TableModule } from 'src/app/shared/components';
import { TranslateListPipe, TranslateObjPipe } from 'src/app/shared/pipes';

import { FeedbackComponent } from './feedback.component';
import { FeedbackRoutingModule } from './feedback-routing.module';

@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    TableModule,
    NgApexchartsModule,
    TranslateListPipe,
    TranslateObjPipe,
  ],
})
export class FeedbackModule {}
