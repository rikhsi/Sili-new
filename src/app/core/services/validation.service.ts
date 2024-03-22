import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { NzValidateStatus } from 'ng-zorro-antd/core/types';
import { VALIDATION_ERROR } from 'src/app/constants';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    #validationMessages = {
        [VALIDATION_ERROR.required]: () => 'validation_messages.required',
        [VALIDATION_ERROR.email]: () => 'validation_messages.email',
        [VALIDATION_ERROR.notRegistered]: () => 'validation_messages.notRegistered',
        [VALIDATION_ERROR.connectionError]: () => 'validation_messages.connectionError',
        [VALIDATION_ERROR.minLength]: () => 'validation_messages.minlength',
        [VALIDATION_ERROR.maxLength]: () => 'validation_messages.maxlength',
        [VALIDATION_ERROR.validating]: () => 'validation_messages.validating',
        [VALIDATION_ERROR.successEmail]: () => 'validation_messages.success_email',
        [VALIDATION_ERROR.wrongData]: () => 'validation_messages.wrong_data',
        [VALIDATION_ERROR.noMessage]: () => '',
        [VALIDATION_ERROR.equal]: () => 'validation_messages.equal',
      };
    
      #validationStatusType = {
        [VALIDATION_ERROR.required]: () => 'error',
        [VALIDATION_ERROR.email]: () =>'error',
        [VALIDATION_ERROR.notRegistered]: () =>'error',
        [VALIDATION_ERROR.connectionError]: () =>'error',
        [VALIDATION_ERROR.minLength]: () =>'error',
        [VALIDATION_ERROR.maxLength]: () =>'error',
        [VALIDATION_ERROR.validating]: () => 'validating',
        [VALIDATION_ERROR.successEmail]: () => 'success',
        [VALIDATION_ERROR.wrongData]: () =>'error',
        [VALIDATION_ERROR.noMessage]: () =>'error',
        [VALIDATION_ERROR.equal]: () => 'warning',
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
    
        const controlKeys = Object.keys(control?.errors ? control?.errors : {});
    
        const messages = Object.values(VALIDATION_ERROR).reduce((arr, error) => {
          if (controlKeys.includes(VALIDATION_ERROR[error])) {
            arr.push(this.#validationMessages[error]());
          }
          return arr;
        }, new Array<string>());
      
        return messages.join('. ');
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

