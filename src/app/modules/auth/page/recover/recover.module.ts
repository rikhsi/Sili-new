import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RecoverComponent } from './recover.component';
import { RecoverRoutingModule } from './recover-routing.module';

@NgModule({
  declarations: [RecoverComponent],
  imports: [CommonModule, RecoverRoutingModule],
})
export class RecoverModule {}
