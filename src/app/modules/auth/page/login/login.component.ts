import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzValidateStatus } from 'ng-zorro-antd/core/types';
import { ValidationService } from 'src/app/core/services';
import { AuthLoginForm } from 'src/app/typings';

@Component({
  selector: 'sili-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<AuthLoginForm>;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService
  ){}

  ngOnInit(): void {
    this.initLoginForm(); 
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group<AuthLoginForm>({
      login: this.fb.control(null, Validators.required),
      password: this.fb.control(null, Validators.required)
    }) ;
  }

  controlMessage(controlName: keyof AuthLoginForm): string {
    return this.validationService.validateField(
      this.loginForm.get(controlName)
    );
  }

  controlStatus(controlName: keyof AuthLoginForm): NzValidateStatus {
    return this.validationService.validateStatus(
      this.loginForm.get(controlName)
    )
  }

  onSubmit(): void {
    if(this.loginForm.valid) {


    } else {
      this.validationService.updateControlStatus(
        this.loginForm
      );
    }
  }
}
