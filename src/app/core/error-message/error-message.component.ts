import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnChanges {
  @Input()
  error: ValidationErrors | null = null;

  errorMessage = '';

  ngOnChanges(changes: SimpleChanges): void {
    const error = changes['error'];
    if (error) {
      this.errorMessage = this.getErrorMessage(error.currentValue);
    }
  }

  private getErrorMessage(errors: ValidationErrors): string {
    let msg: string[] = [];
    if (errors?.['required']) {
      msg.push('This field is required.');
    }

    if (errors?.['minlength']) {
      const { requiredLength, actualLength } = errors?.['minlength'];
      const message = `Min length: ${requiredLength}. Current: ${actualLength}.`;
      msg.push(message);
    }

    return msg.join(' || ');
  }
}
