import { AbstractControl, ValidationErrors } from '@angular/forms';
import {
  getVerboseControlValidationMessage as getErrorMessage
} from './get-verbose-control-validation-message';

export const getErrorMessageForControl = (control: AbstractControl | null): string | null => {

  const controlErrors: ValidationErrors | null = control?.errors || null;
  if (controlErrors && control?.touched) {
    return getErrorMessage(controlErrors);
  }
  return null;
}
