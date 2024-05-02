import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApexAxisChartSeries } from 'ng-apexcharts';
import { BehaviorSubject, catchError, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { FEEDBACK_QUERY } from 'src/app/api/constants';
import { BaseApiService } from 'src/app/api/services';
import { FeedbackData, FeedbackItem, FeedbackResponse } from 'src/app/api/typings';
import { ERROR_MESSAGE, STATUS } from 'src/app/constants';
import { MessageService } from 'src/app/core/services';
import { ChartOptions, TableHeaderCol } from 'src/app/typings';

@Injectable()
export class FeedbackService {
  readonly filterForm = this.fb.group({
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

  #tableCols = new BehaviorSubject<TableHeaderCol[]>(this.initCols());

  get tableCols$(): Observable<TableHeaderCol[]> {
    return this.#tableCols.asObservable();
  }

  #chartOptions = new BehaviorSubject<ChartOptions>(this.initChartOptions());

  get chartOptions$(): Observable<ChartOptions> {
    return this.#chartOptions.asObservable();
  }

  #chartSeries = new BehaviorSubject<ApexAxisChartSeries>(null);

  get chartSeries$(): Observable<ApexAxisChartSeries> {
    return this.#chartSeries.asObservable();
  }

  constructor(
    private fb: FormBuilder,
    private baseApiService: BaseApiService,
    private messageService: MessageService,
  ) {}

  getFeedbackRes$(value: FeedbackData): Observable<never> {
    return this.baseApiService
      .getQuery$<FeedbackResponse>(this.baseApiService.generateParams(value, FEEDBACK_QUERY.get))
      .pipe(
        tap(({ requests }) => {
          this.#tableData.next(requests);
          this.filterForm.enable({ emitEvent: false });
        }),
        map(() => [
          {
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
          },
        ]),
        tap((series) => this.#chartSeries.next(series)),
        switchMap(() => EMPTY),
        catchError(() => {
          this.messageService.onNotifyError(ERROR_MESSAGE.server);

          return EMPTY;
        }),
      );
  }

  private initChartOptions(): ChartOptions {
    return {
      series: [
        {
          name: 'My-series',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
        toolbar: { show: false },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      tooltip: { enabled: false },
    };
  }

  private initCols(): TableHeaderCol[] {
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
