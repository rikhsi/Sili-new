import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { DefaultButtonComponent, DefaultInputComponent, SvgIconComponent } from 'src/app/shared/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TranslocoModule } from '@ngneat/transloco';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { SubmitDirective } from 'src/app/shared/directives';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    DefaultInputComponent,
    DefaultButtonComponent,
    NzDividerComponent,
    FormsModule,
    ReactiveFormsModule,
    NzTypographyModule,
    TranslocoModule,
    NzFlexModule,
    SubmitDirective,
    SvgIconComponent
  ]
})
export class LoginModule { }
