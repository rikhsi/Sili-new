import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { FeedbackItem } from 'src/app/api/typings';
import { FeedbackFilterForm, TableHeaderCol } from 'src/app/typings';

import { FeedbackService } from '../../feedback.service';

@Component({
  selector: 'sili-feedback-table',
  templateUrl: './feedback-table.component.html',
  styleUrl: './feedback-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackTableComponent implements OnInit {
  isLoading = input<boolean>();
  tableData = input<FeedbackItem[]>();
  tableCols$: Observable<TableHeaderCol<FeedbackFilterForm>[]>;

  get feedbackForm(): FormGroup<FeedbackFilterForm> {
    return this.feedbackService.filterForm;
  }

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.tableCols$ = this.feedbackService.tableCols$;
  }

  onPageSizeChange(query: NzTableQueryParams): void {
    this.feedbackForm.patchValue({
      skip: (query.pageIndex - 1) * query.pageSize,
      limit: query.pageSize,
    });
  }
}
