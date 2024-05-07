import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
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

  #chartStatusOptions = new BehaviorSubject<ChartOptions>(this.initStatusChartOptions());

  get chartStatusOptions$(): Observable<ChartOptions> {
    return this.#chartStatusOptions.asObservable();
  }

  #chartYearOptions = new BehaviorSubject<ChartOptions>(this.initYearChartOptions());

  get chartYearOptions$(): Observable<ChartOptions> {
    return this.#chartYearOptions.asObservable();
  }

  #chartMonthOptions = new BehaviorSubject<ChartOptions>(this.initMonthChartOptions());

  get chartMonthOptions$(): Observable<ChartOptions> {
    return this.#chartMonthOptions.asObservable();
  }

  #chartWeekOptions = new BehaviorSubject<ChartOptions>(this.initWeekChartOptions());

  get chartWeekOptions$(): Observable<ChartOptions> {
    return this.#chartWeekOptions.asObservable();
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
        switchMap(() => EMPTY),
        catchError(() => {
          this.messageService.onNotifyError(ERROR_MESSAGE.server);

          return EMPTY;
        }),
      );
  }

  private initStatusChartOptions(): ChartOptions {
    return {
      series: [10, 41, 35, 51],
      chart: {
        width: 350,
        type: 'pie',
      },
      stroke: {
        width: 0,
      },
      labels: Object.values(STATUS),
    };
  }

  private initYearChartOptions(): ChartOptions {
    return {
      series: [
        {
          data: [10, 41, 35, 51, 23, 45, 56, 23, 2, 65, 6, 2],
        },
      ],
      chart: {
        height: 220,
        type: 'bar',
        toolbar: { show: false },
      },
      xaxis: {
        categories: [
          'month.jan',
          'month.feb',
          'month.mar',
          'month.apr',
          'month.may',
          'month.jun',
          'month.jul',
          'month.aug',
          'month.sep',
          'month.oct',
          'month.nov',
          'month.dec',
        ],
      },
      tooltip: { enabled: false },
    };
  }

  private initMonthChartOptions(): ChartOptions {
    return {
      series: [
        {
          data: [10, 41, 35, 51, 23, 45, 56, 23, 2, 65, 6, 2],
        },
      ],
      chart: {
        height: 220,
        type: 'bar',
        toolbar: { show: false },
      },
      xaxis: {
        categories: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
          26, 27, 28, 29, 30, 31,
        ],
      },
      tooltip: { enabled: false },
    };
  }

  private initWeekChartOptions(): ChartOptions {
    return {
      series: [
        {
          data: [10, 41, 35, 51, 23, 45, 56],
        },
      ],
      chart: {
        height: 220,
        type: 'bar',
        toolbar: { show: false },
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7],
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
