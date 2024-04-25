import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FeedbackItem } from 'src/app/api/typings';
import { FeedbackFilterForm } from 'src/app/typings';

import { FeedbackService } from '../../feedback.service';

@Component({
  selector: 'sili-feedback-table',
  templateUrl: './feedback-table.component.html',
  styleUrl: './feedback-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackTableComponent {
  isLoading = input<boolean>();
  tableData = input<FeedbackItem[]>();
  tableCols = signal<string[]>(this.initCols());

  get feedbackForm(): FormGroup<FeedbackFilterForm> {
    return this.feedbackService.filterForm;
  }

  constructor(private feedbackService: FeedbackService) {}

  private initCols(): string[] {
    return ['name', 'phone_number', 'time', 'status'];
  }
}
