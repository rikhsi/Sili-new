import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { DefaultButtonComponent, DefaultInputComponent, SvgIconComponent } from 'src/app/shared/components';
import { SubmitDirective } from 'src/app/shared/directives';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

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
    SvgIconComponent,
  ],
})
export class LoginModule {}
