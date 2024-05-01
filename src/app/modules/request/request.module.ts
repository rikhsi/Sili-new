import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'src/app/shared/components';

import { RequestComponent } from './request.component';
import { RequestRoutingModule } from './request-routing.module';

@NgModule({
  declarations: [RequestComponent],
  imports: [CommonModule, RequestRoutingModule, TableModule],
})
export class RequestModule {}
