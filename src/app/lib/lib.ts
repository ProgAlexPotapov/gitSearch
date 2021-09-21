import {FormControl} from '@angular/forms';

export const InputPattern = {
  Letters: /[a-zA-Z]+/
};

export function getValidationMessage(formControl: FormControl): any {
  if (formControl.hasError('required')) {
    return 'You must enter a value';
  }
  if (formControl.errors && formControl.hasError('minlength') && formControl.hasError('maxlength')) {
    return `The length must be ${formControl?.errors.minlength.requiredLength} symbols`;
  } else if (formControl.errors && formControl.hasError('minlength')) {
    return `Minimal length is ${formControl?.errors.minlength.requiredLength} symbols`;
  } else if (formControl.errors && formControl.hasError('maxlength')) {
    return `Maximal length is ${formControl.errors.maxlength.requiredLength} symbols`;
  }
}
