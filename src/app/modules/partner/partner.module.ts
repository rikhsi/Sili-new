import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'src/app/shared/components';

import { PartnerComponent } from './partner.component';
import { PartnerRoutingModule } from './partner-routing.module';

@NgModule({
  declarations: [PartnerComponent],
  imports: [CommonModule, PartnerRoutingModule, TableModule],
})
export class PartnerModule {}
