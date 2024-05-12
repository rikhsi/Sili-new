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
import { ShopFilterForm, ShopItem, TableHeaderCol } from 'src/app/typings';

import { ShopHomeService } from './shop-home.service';

@Component({
  selector: 'sili-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrl: './shop-home.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ShopHomeService],
})
export class ShopHomeComponent implements OnInit {
  tableData$: Observable<ShopItem[]> = this.shopHomeService.tableData$;
  tableCols$: Observable<TableHeaderCol[]> = this.shopHomeService.tableCols$;

  get filterForm(): FormGroup<ShopFilterForm> {
    return this.shopHomeService.filterForm;
  }

  constructor(
    private shopHomeService: ShopHomeService,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.initShopHomeData();
  }

  onQueryChange(query: NzTableQueryParams): void {
    this.filterForm.patchValue({
      skip: (query.pageIndex - 1) * query.pageSize,
      limit: query.pageSize,
    });
  }

  private initShopHomeData(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.filterForm.disable({ emitEvent: false });
          this.cdr.markForCheck();
        }),
        switchMap((formValue) => this.shopHomeService.getShopHomeRes$(formValue)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
