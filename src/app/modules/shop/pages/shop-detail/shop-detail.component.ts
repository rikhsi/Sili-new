import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sili-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrl: './shop-detail.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopDetailComponent {}
