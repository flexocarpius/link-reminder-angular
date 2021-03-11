import { FormGroup, ValidatorFn } from '@angular/forms';

export abstract class ConfirmValidation {
  static ConfirmValidation(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: FormGroup): { [s: string]: boolean } => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmed: true });
        return { confirmed: true };
      } else {
        return;
      }
    };
  }
}
