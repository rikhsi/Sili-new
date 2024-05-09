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
import { Partner } from 'src/app/api/typings';
import { ChartOptions, PartnersFilterForm, TableHeaderCol } from 'src/app/typings';

import { PartnerService } from './partner.service';

@Component({
  selector: 'sili-partner',
  templateUrl: './partner.component.html',
  styleUrl: './partner.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PartnerService],
})
export class PartnerComponent implements OnInit {
  tableData$: Observable<Partner[]>;
  tableCols$: Observable<TableHeaderCol[]>;

  chartStatusOptions$: Observable<ChartOptions> = this.partnerService.chartStatusOptions$;
  chartYearOptions$: Observable<ChartOptions> = this.partnerService.chartYearOptions$;

  get filterForm(): FormGroup<PartnersFilterForm> {
    return this.partnerService.filterForm;
  }

  constructor(
    private destroyRef: DestroyRef,
    private partnerService: PartnerService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.tableData$ = this.partnerService.tableData$;
    this.tableCols$ = this.partnerService.tableCols$;

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
        switchMap((formValue) => this.partnerService.getFeedbackRes$(formValue)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
