import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';
import { FEEDBACK_QUERY } from 'src/app/api/constants';
import { BaseApiService } from 'src/app/api/services';
import { FeedbackData, FeedbackItem, FeedbackResponse } from 'src/app/api/typings';
import { ERROR_MESSAGE, STATUS } from 'src/app/constants';
import { MessageService } from 'src/app/core/services';
import { FeedbackFilterForm, TableHeaderCol } from 'src/app/typings';

@Injectable()
export class FeedbackService {
  readonly filterForm = this.fb.group<FeedbackFilterForm>({
    status: this.fb.control(null),
    min_date: this.fb.control(null),
    max_date: this.fb.control(null),
    skip: this.fb.control(0),
    limit: this.fb.control(10),
  });

  #tableData = new BehaviorSubject<FeedbackItem[]>([]);

  get tableData$(): Observable<FeedbackItem[]> {
    return this.#tableData.asObservable();
  }

  #tableCols = new BehaviorSubject<TableHeaderCol<FeedbackFilterForm>[]>(this.initCols());

  get tableCols$(): Observable<TableHeaderCol<FeedbackFilterForm>[]> {
    return this.#tableCols.asObservable();
  }

  constructor(
    private fb: FormBuilder,
    private baseApiService: BaseApiService,
    private messageService: MessageService,
  ) {}

  getFeedbackRes$(value: FeedbackData): Observable<FeedbackResponse> {
    return this.baseApiService
      .getQuery$<FeedbackResponse>(this.baseApiService.generateParams(value, FEEDBACK_QUERY.get))
      .pipe(
        tap(({ requests }) => {
          this.#tableData.next(requests);
          this.filterForm.enable({ emitEvent: false });
        }),
        catchError(() => {
          this.messageService.onNotifyError(ERROR_MESSAGE.server);

          return EMPTY;
        }),
      );
  }

  private initCols(): TableHeaderCol<FeedbackFilterForm>[] {
    return [
      {
        name: 'name',
        field: 'name',
        fieldType: 'text',
        isSort: true,
        customFilters: [
          {
            type: 'search',
            icon: 'search',
          },
        ],
      },
      {
        name: 'phone',
        field: 'telephone_number',
        fieldType: 'phone',
        customFilters: [
          {
            type: 'search',
            icon: 'search',
          },
        ],
      },
      {
        name: 'time',
        field: 'created_at',
        fieldType: 'time',
        isSort: true,
        customFilters: [
          {
            type: 'datePicker',
            icon: 'calendar',
          },
        ],
      },
      {
        name: 'status',
        field: 'status',
        fieldType: 'status',
        customFilters: [
          {
            type: 'select',
            options: Object.values(STATUS).map((item) => ({
              label: item,
              value: item,
            })),
            icon: 'filter',
          },
        ],
      },
    ];
  }
}
