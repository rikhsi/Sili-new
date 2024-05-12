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
import { RequestFilterForm, RequestItem, TableHeaderCol } from 'src/app/typings';

import { RequestService } from './request.service';

@Component({
  selector: 'sili-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RequestService],
})
export class RequestComponent implements OnInit {
  tableData$: Observable<RequestItem[]>;
  tableCols$: Observable<TableHeaderCol[]>;

  get filterForm(): FormGroup<RequestFilterForm> {
    return this.requestService.filterForm;
  }

  constructor(
    private destroyRef: DestroyRef,
    private requestService: RequestService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.tableData$ = this.requestService.tableData$;
    this.tableCols$ = this.requestService.tableCols$;

    this.initRequestData();
  }

  onQueryChange(query: NzTableQueryParams): void {
    this.filterForm.patchValue({
      skip: (query.pageIndex - 1) * query.pageSize,
      limit: query.pageSize,
    });
  }

  private initRequestData(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.filterForm.disable({ emitEvent: false });
          this.cdr.markForCheck();
        }),
        switchMap((formValue) => this.requestService.getRequestRes$(formValue)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
