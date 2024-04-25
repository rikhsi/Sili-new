import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, Observable, startWith, switchMap, takeUntil, tap } from 'rxjs';
import { FeedbackItem } from 'src/app/api/typings';
import { DestroyService } from 'src/app/core/services';
import { FeedbackFilterForm } from 'src/app/typings';

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

  get filterForm(): FormGroup<FeedbackFilterForm> {
    return this.feedbackService.filterForm;
  }

  constructor(
    private destroy$: DestroyService,
    private feedbackService: FeedbackService,
  ) {}

  ngOnInit(): void {
    this.tableData$ = this.feedbackService.tableData$;

    this.initFeedbackData();
  }

  private initFeedbackData(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(1000),
        startWith(this.filterForm.value),
        tap(() => this.filterForm.disable({ emitEvent: false })),
        switchMap((formValue) => this.feedbackService.getFeedbackRes$(formValue)),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
