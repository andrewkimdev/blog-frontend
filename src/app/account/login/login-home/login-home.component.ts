import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getErrorMessageForControl } from 'src/app/shared/functions';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginHomeComponent {

  inputControlError = getErrorMessageForControl;

  constructor(private fb: FormBuilder) {
  }

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  ngOnInit(): void {
  }

  onLoginButtonClicked() {
    console.log(this.form.value);
  }
}
