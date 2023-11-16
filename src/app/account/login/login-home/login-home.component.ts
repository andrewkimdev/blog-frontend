import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { getErrorMessageForControl } from 'src/app/shared/functions';

import { loginWithEmailPassword } from '../../store/auth.actions';
import { selectAuthFeature } from '../../store/auth.selectors';

interface VM {
  isLoggedIn: boolean;
  email: string;
  accountConfirmed: boolean;
  error: {
    msg: string;
    code: number;
  } | null;
}

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginHomeComponent {

  inputControlError = getErrorMessageForControl;

  vm$: Observable<VM> = this.store.select(selectAuthFeature).pipe(
    map((state) => {
        const isLoggedIn = state.isLoggedIn;
        const email = state.session?.user.email ?? '';
        const accountConfirmed = !!state.session?.user?.confirmed_at;
        const error = state.error;
        return { isLoggedIn, email, accountConfirmed, error };
    }),
    tap(({ isLoggedIn }) => {
      if (isLoggedIn) {
        this.router.navigate(['/']).then();
      }
    }),
  );

  disableInput(vm: VM): boolean {
    return !vm.accountConfirmed && !vm.isLoggedIn && !!vm.email;
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
  ) {
  }

  form: FormGroup = this.fb.group({
    username: ['kimbi@cliensoft.com', [Validators.required, Validators.email]],
    password: ['password0!', [Validators.required]],
    rememberMe: [true],
  });

  onLoginButtonClicked() {
    const { username, password, rememberMe } = this.form.value;
    this.store.dispatch(loginWithEmailPassword({ username, password, rememberMe }));
  }
}
