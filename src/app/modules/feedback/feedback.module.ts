import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'src/app/shared/components';

import { FeedbackComponent } from './feedback.component';
import { FeedbackRoutingModule } from './feedback-routing.module';

@NgModule({
  declarations: [FeedbackComponent],
  imports: [CommonModule, FeedbackRoutingModule, TableModule],
})
export class FeedbackModule {}
