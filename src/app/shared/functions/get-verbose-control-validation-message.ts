import { ValidationErrors } from '@angular/forms';

export const getVerboseControlValidationMessage = (errors: ValidationErrors) => {
  let msg: string[] = [];

  if (errors?.['minlength']) {
    const { requiredLength, actualLength } = errors?.['minlength'];
    const message = `Min length: ${requiredLength}. Current: ${actualLength}.`;
    msg.push(message);
  }

  if (errors?.['required']) {
    msg.push('This field is required.');
  }

  if (errors?.['email']) {
    const message = 'Invalid email format';
    msg.push(message);
  }

  if (errors?.['login']) {
    const message = 'Invalid login credentials';
    msg.push(message);
  }

  return msg.join(' || ');
}
