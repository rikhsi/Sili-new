import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { DefaultButtonComponent, DefaultInputComponent } from 'src/app/shared/components';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDividerComponent } from 'ng-zorro-antd/divider';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    DefaultInputComponent,
    DefaultButtonComponent,
    NzDividerComponent,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
