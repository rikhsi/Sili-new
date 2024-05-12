import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';
import { ERROR_MESSAGE, PAYMENT, SHOP_QUERY, STATUS } from 'src/app/constants';
import { BaseApiService, MessageService } from 'src/app/core/services';
import { ShopData, ShopFilterForm, ShopItem, ShopResponse, TableHeaderCol } from 'src/app/typings';

@Injectable()
export class ShopHomeService {
  readonly filterForm = this.fb.group<ShopFilterForm>({
    name: this.fb.control(null),
    phone: this.fb.control(null),
    payment: this.fb.control(null),
    active: this.fb.control(null),
    min_date: this.fb.control(null),
    max_date: this.fb.control(null),
    location: this.fb.control(null),
    skip: this.fb.control(0),
    limit: this.fb.control(10),
  });

  #tableData = new BehaviorSubject<ShopItem[]>([]);

  get tableData$(): Observable<ShopItem[]> {
    return this.#tableData.asObservable();
  }

  #tableCols = new BehaviorSubject<TableHeaderCol[]>(this.initCols());

  get tableCols$(): Observable<TableHeaderCol[]> {
    return this.#tableCols.asObservable();
  }

  constructor(
    private fb: FormBuilder,
    private baseApiService: BaseApiService,
    private messageService: MessageService,
  ) {}

  getShopHomeRes$(value: ShopData): Observable<ShopResponse> {
    return this.baseApiService
      .getQuery$<ShopResponse>(this.baseApiService.generateParams(value, SHOP_QUERY.get))
      .pipe(
        tap(({ shops }) => {
          this.#tableData.next(shops);
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
        name: 'payment',
        field: 'payment',
        fieldType: 'payment',
        customFilters: [
          {
            type: 'multiSelect',
            options: Object.values(PAYMENT).map((item) => ({
              label: item,
              value: item,
            })),
            icon: 'filter',
          },
        ],
      },
      {
        name: 'location',
        field: 'location',
        fieldType: 'link',
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
        field: 'is_active',
        fieldType: 'checkStatus',
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
