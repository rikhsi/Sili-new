import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RequestComponent } from './request.component';
import { RequestRoutingModule } from './request-routing.module';

@NgModule({
  declarations: [RequestComponent],
  imports: [CommonModule, RequestRoutingModule],
})
export class RequestModule {}
