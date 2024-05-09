import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TableModule } from 'src/app/shared/components';
import { TranslateListPipe, TranslateObjPipe } from 'src/app/shared/pipes';

import { PartnerComponent } from './partner.component';
import { PartnerRoutingModule } from './partner-routing.module';

@NgModule({
  declarations: [PartnerComponent],
  imports: [
    CommonModule,
    PartnerRoutingModule,
    TableModule,
    NgApexchartsModule,
    TranslateListPipe,
    TranslateObjPipe,
  ],
})
export class PartnerModule {}
