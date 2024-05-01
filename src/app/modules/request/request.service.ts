import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';
import { REQUEST_QUERY } from 'src/app/api/constants';
import { BaseApiService } from 'src/app/api/services';
import { RequestData, RequestItem, RequestResponse } from 'src/app/api/typings';
import { ERROR_MESSAGE, STATUS } from 'src/app/constants';
import { MessageService } from 'src/app/core/services';
import { RequestFilterForm, TableHeaderCol } from 'src/app/typings';

@Injectable()
export class RequestService {
  readonly filterForm = this.fb.group<RequestFilterForm>({
    phone: this.fb.control(null),
    name: this.fb.control(null),
    shop_name: this.fb.control(null),
    configuration: this.fb.control(null),
    status: this.fb.control(null),
    car_name: this.fb.control(null),
    min_date: this.fb.control(null),
    max_date: this.fb.control(null),
    skip: this.fb.control(0),
    limit: this.fb.control(10),
  });

  #tableData = new BehaviorSubject<RequestItem[]>([]);

  get tableData$(): Observable<RequestItem[]> {
    return this.#tableData.asObservable();
  }

  #tableCols = new BehaviorSubject<TableHeaderCol[]>(this.initCols());

  get tableCols$(): Observable<TableHeaderCol[]> {
    return this.#tableCols.asObservable();
  }

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private baseApiService: BaseApiService,
  ) {}

  getRequestRes$(value: RequestData): Observable<RequestResponse> {
    return this.baseApiService
      .getQuery$<RequestResponse>(this.baseApiService.generateParams(value, REQUEST_QUERY.get))
      .pipe(
        tap(({ applications }) => {
          this.#tableData.next(applications);
          this.filterForm.enable({ emitEvent: false });
        }),
        catchError(() => {
          this.messageService.onNotifyError(ERROR_MESSAGE.server);

          return EMPTY;
        }),
      );
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
        name: 'shop',
        field: 'shop_name',
        fieldType: 'link',
        customFilters: [
          {
            type: 'search',
            icon: 'search',
          },
        ],
      },
      {
        name: 'car_name',
        field: 'car_name',
        fieldType: 'link',
        customFilters: [
          {
            type: 'search',
            icon: 'search',
          },
        ],
      },
      {
        name: 'configuration',
        field: 'configuration',
        fieldType: 'text',
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
