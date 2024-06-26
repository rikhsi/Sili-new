import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzValidateStatus } from 'ng-zorro-antd/core/types';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { AUTH_QUERY } from 'src/app/constants';
import {
  BaseApiService,
  NavigationService,
  StorageService,
  ValidationService,
} from 'src/app/core/services';
import { AuthLoginData, AuthLoginForm, IAuthLoginResponse, NZ_ICONS_TYPE } from 'src/app/typings';

@Component({
  selector: 'sili-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<AuthLoginForm>;
  eye = signal<NZ_ICONS_TYPE>('eye-invisible');
  passwordType = signal<string>('password');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private baseApiService: BaseApiService,
    private storageService: StorageService,
    private navigationService: NavigationService,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  toggleEye(): void {
    const eyeState = this.eye() === 'eye' ? 'eye-invisible' : 'eye';

    const passwordType = this.eye() === 'eye' ? 'password' : 'text';

    this.eye.set(eyeState);
    this.passwordType.set(passwordType);
  }

  controlMessage(controlName: keyof AuthLoginForm): string {
    return this.validationService.validateField(this.loginForm.get(controlName));
  }

  controlStatus(controlName: keyof AuthLoginForm): NzValidateStatus {
    return this.validationService.validateStatus(this.loginForm.get(controlName));
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginForm.disable();

      this.baseApiService
        .postQuery<AuthLoginData, IAuthLoginResponse>(AUTH_QUERY.login, this.loginForm.value)
        .pipe(
          map((response) => response.token),
          tap((token) => this.onLoginSuccess(token)),
          catchError(() => this.onLoginError$()),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe();
    } else {
      this.validationService.updateControlStatus(this.loginForm);
    }
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group<AuthLoginForm>({
      login: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      password: this.fb.control(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  private onLoginError$(): Observable<never> {
    this.loginForm.reset();
    this.loginForm.enable();
    this.cdr.markForCheck();

    return EMPTY;
  }

  private onLoginSuccess(token: string): void {
    this.storageService.token = token;
    this.navigationService.onLogIn();
  }
}
