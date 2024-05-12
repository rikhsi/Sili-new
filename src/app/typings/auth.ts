import { FormControl } from '@angular/forms';

import { FormValue } from './base';

export type AuthLoginForm = {
  login: FormControl<string>;
  password: FormControl<string>;
};

export type AuthLoginData = FormValue<AuthLoginForm>;

export interface IAuthLoginResponse {
  token: string;
}
