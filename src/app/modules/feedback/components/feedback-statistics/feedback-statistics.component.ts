import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sili-feedback-statistics',
  templateUrl: './feedback-statistics.component.html',
  styleUrl: './feedback-statistics.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackStatisticsComponent {}
