export enum VALIDATION_STATUS {
    success = 'success',
    warning = 'warning',
    error = 'error',
    validating = 'validating',
    formControl = 'FormControl',
    ngModel = 'NgModel'
}

export enum VALIDATION_ERROR {
    required = 'required',
    email = 'email',
    validating = 'validating',
    minLength = 'minLength',
    maxLength = 'maxLength',
    notRegistered = 'notRegistered',
    connectionError = 'connectionError',
    successEmail = 'successEmail',
    wrongData = 'wrongData',
    noMessage = 'noMessage',
    equal = 'equal'
}