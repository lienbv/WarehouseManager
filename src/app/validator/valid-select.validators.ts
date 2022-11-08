import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function validSelectValidators(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors=> {
    if (control.value == 0) {
      return {"notNull": true}
    }
    // @ts-ignore
    return null;
  }
}
