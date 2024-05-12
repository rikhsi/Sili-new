import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShopDetailComponent } from './shop-detail.component';
import { ShopDetailRoutingModule } from './shop-detail-routing.module';

@NgModule({
  declarations: [ShopDetailComponent],
  imports: [CommonModule, ShopDetailRoutingModule],
})
export class ShopDetailModule {}
