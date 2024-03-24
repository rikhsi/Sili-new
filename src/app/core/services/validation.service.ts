import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { NzValidateStatus } from 'ng-zorro-antd/core/types';
import { VALIDATION_ERROR } from 'src/app/constants';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {
  #validationMessages = {
    [VALIDATION_ERROR.required]: () => this.getTranslation(VALIDATION_ERROR.required),
    [VALIDATION_ERROR.minlength]: (control: AbstractControl) => (
      this.getTranslation(VALIDATION_ERROR.minlength, control)
    ),
    [VALIDATION_ERROR.maxlength]: (control: AbstractControl) => (
      this.getTranslation(VALIDATION_ERROR.maxlength, control)
    )
  };
  
  #validationStatusType = {
    [VALIDATION_ERROR.required]: () => 'error',
    [VALIDATION_ERROR.minlength]: () =>'error',
    [VALIDATION_ERROR.maxlength]: () =>'error'
  }

  constructor(private translocoService: TranslocoService){}

  private getTranslation(key: string, control?: AbstractControl): string {
    const translation = this.translocoService.translate(`validation.${key}`);

    if(control) {
      return `${translation}: ${control.getError(key).requiredLength}`
    }

    return translation 
  }

  validateStatus(control: AbstractControl): NzValidateStatus {
    if(control?.valid && control?.dirty) return 'success';
    
    if (control?.errors && control?.dirty) {
      const controlKeys = Object.keys(control?.errors ? control?.errors : {});

      const messages = Object.values(VALIDATION_ERROR).reduce((arr, error) => {
        if (controlKeys.includes(VALIDATION_ERROR[error])) {
          arr.push(this.#validationStatusType[error]());
        }
        return arr;
      }, new Array<string>());
    
      return messages.join('. ') as NzValidateStatus;
    }

    return '';
  }

  validateField(control: AbstractControl): string {
    if (!control?.invalid || !control?.dirty) return '';

    const controlErrorKeys = Object.keys(control?.errors ? control?.errors : {});

    const errorMessages = Object.values(VALIDATION_ERROR).reduce((arr, error) => {
      if (controlErrorKeys.includes(VALIDATION_ERROR[error])) {
        arr.push(this.#validationMessages[error](control));
      }
      return arr;
    }, new Array<string>());

    return errorMessages.join('. ');
  }

  updateControlStatus(control: AbstractControl | FormGroup | FormArray): void {
    if (control instanceof FormGroup || control instanceof FormArray) {
      Object.values(control.controls).forEach((innerControl) => {
        this.updateControlStatus(innerControl);
      });
    } else {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    }
  }

  isControlInvalid(control: AbstractControl): boolean {
    return control.dirty && control.invalid;
  }
}

