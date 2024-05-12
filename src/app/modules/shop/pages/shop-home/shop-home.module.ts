import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'src/app/shared/components';

import { ShopHomeComponent } from './shop-home.component';
import { ShopHomeRoutingModule } from './shop-home-routing.module';

@NgModule({
  declarations: [ShopHomeComponent],
  imports: [CommonModule, ShopHomeRoutingModule, TableModule],
})
export class ShopHomeModule {}
