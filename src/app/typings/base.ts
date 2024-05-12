import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export type FormValue<T> = {
  [K in keyof T]?: T[K] extends FormControl<infer U> ? U : never;
};

export type ControlType = AbstractControl | FormGroup | FormArray;

export type FunctionType = (value?: string | number) => void;

export type JwtOptions = {
  tokenGetter: () => string;
};

export interface PaginationData {
  skip: number;
  limit: number;
}

export type TimeType = string | number | Date;
