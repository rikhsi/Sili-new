import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { debounceTime, Observable, switchMap, tap } from 'rxjs';
import { FeedbackItem } from 'src/app/api/typings';
import { ChartOptions, FeedbackFilterForm, TableHeaderCol } from 'src/app/typings';

import { FeedbackService } from './feedback.service';

@Component({
  selector: 'sili-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FeedbackService],
})
export class FeedbackComponent implements OnInit {
  tableData$: Observable<FeedbackItem[]> = this.feedbackService.tableData$;
  tableCols$: Observable<TableHeaderCol[]> = this.feedbackService.tableCols$;

  chartStatusOptions$: Observable<ChartOptions> = this.feedbackService.chartStatusOptions$;
  chartYearOptions$: Observable<ChartOptions> = this.feedbackService.chartYearOptions$;

  get filterForm(): FormGroup<FeedbackFilterForm> {
    return this.feedbackService.filterForm;
  }

  constructor(
    private destroyRef: DestroyRef,
    private feedbackService: FeedbackService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
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
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
