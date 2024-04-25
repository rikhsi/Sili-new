import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

import { ICONS_TYPE } from './icons.type';

export type FormValue<T> = {
  [K in keyof T]?: T[K] extends FormControl<infer U> ? U : never;
};

export type ControlType = AbstractControl | FormGroup | FormArray;

export type FunctionType = (value?: string | number) => void;

export type JwtOptions = {
  tokenGetter: () => string;
};

export type TableHeaderCol<F> = {
  name: string;
  icon?: ICONS_TYPE;
  control?: keyof FormValue<F>;
};
