import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginWithEmailPassword } from 'src/app/account/store/auth.actions';

import { getErrorMessageForControl } from 'src/app/shared/functions';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginHomeComponent {

  inputControlError = getErrorMessageForControl;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
  }

  form: FormGroup = this.fb.group({
    username: ['andrewkimdev@gmail.com', [Validators.required, Validators.email]],
    password: ['password0!', [Validators.required]],
    rememberMe: [false],
  });

  ngOnInit(): void {
  }

  onLoginButtonClicked() {
    const { username, password, rememberMe } = this.form.value;
    this.store.dispatch(loginWithEmailPassword({ username, password, rememberMe }));
  }
}
