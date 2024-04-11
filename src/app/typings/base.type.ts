import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";

export type FormValue<T> = {
    [K in keyof T]?: T[K] extends FormControl<infer U> ? U : never;
};

export type ControlType =  AbstractControl | FormGroup | FormArray;