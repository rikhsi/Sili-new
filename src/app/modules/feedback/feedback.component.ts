import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { debounceTime, Observable, switchMap, takeUntil, tap } from 'rxjs';
import { FeedbackItem } from 'src/app/api/typings';
import { DestroyService } from 'src/app/core/services';
import { FeedbackFilterForm, TableHeaderCol } from 'src/app/typings';

import { FeedbackService } from './feedback.service';

@Component({
  selector: 'sili-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FeedbackService, DestroyService],
})
export class FeedbackComponent implements OnInit {
  tableData$: Observable<FeedbackItem[]>;
  tableCols$: Observable<TableHeaderCol<FeedbackFilterForm>[]>;

  get filterForm(): FormGroup<FeedbackFilterForm> {
    return this.feedbackService.filterForm;
  }

  constructor(
    private destroy$: DestroyService,
    private feedbackService: FeedbackService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.tableData$ = this.feedbackService.tableData$;
    this.tableCols$ = this.feedbackService.tableCols$;

    this.initFeedbackData();
  }

  onQueryChange(query: NzTableQueryParams): void {
    this.filterForm.patchValue({
      skip: (query.pageIndex - 1) * query.pageSize,
      limit: query.pageSize,
    });
  }

  private initFeedbackData(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.filterForm.disable({ emitEvent: false });
          this.cdr.markForCheck();
        }),
        switchMap((formValue) => this.feedbackService.getFeedbackRes$(formValue)),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
