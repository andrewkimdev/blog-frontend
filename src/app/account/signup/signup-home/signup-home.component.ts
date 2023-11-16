import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { getErrorMessageForControl } from 'src/app/shared/functions';

import { signupWithEmailPassword } from '../../store/auth.actions';
import { selectIsLoading } from '../../store/auth.selectors';

@Component({
  selector: 'app-signup-home',
  templateUrl: './signup-home.component.html',
  styleUrls: ['./signup-home.component.scss']
})
export class SignupHomeComponent {
  inputControlError = getErrorMessageForControl;

  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ){
  }

  form = this.fb.group({
    username: ['', [Validators.email, Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  onSignupButtonClicked() {
    const { username, password } = this.form.value;
    if (!username || !password) {
      return;
    }
    this.store.dispatch(signupWithEmailPassword({ username, password }));
  }
}
