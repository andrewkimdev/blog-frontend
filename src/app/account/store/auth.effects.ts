import { Injectable } from '@angular/core';
import { catchError, EMPTY, exhaustMap, map, tap } from 'rxjs';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthService } from '../auth.service';
import { isTokenInEffectiveTimeframe } from 'src/app/shared/functions';

import { Session } from '@supabase/supabase-js';
import { SignupResponse } from '../../shared/types';

import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthEffects {

  constructor(
    private store: Store,
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private snackbar: MatSnackBar,
  ) {
  }

  init$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.init),
    map(() => {
      const storageKey = environment.supabase.STORAGE_KEY;
      const res = localStorage.getItem(storageKey);
      if (res) {
        const session: Session = JSON.parse(res);

        if (isTokenInEffectiveTimeframe(session.access_token)) {
          return AuthActions.rehydrateAuthStateSuccess({ session })
        } else {
          return AuthActions.tokenNotInEffectiveTimeframe();
        }
      } else {
        return AuthActions.noOp();
      }
    }),
  ));

  redirectToLogin$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.tokenNotInEffectiveTimeframe),
    tap(() => {
      this.router.navigate(['account', 'login']).then();
    }),
  ), { dispatch: false });

  loginWithEmailPassword$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginWithEmailPassword),
    exhaustMap(({ username, password, rememberMe }) =>
      this.authService.loginWithEmailPassword(username, password)),
    map(({ user, session }) =>
      AuthActions.loginWithEmailPasswordSuccess({ user, session })
    ),
    catchError((err) => {
      console.error(err);
      this.store.dispatch(AuthActions.loginWithEmailPasswordFailure());
      return EMPTY;
    }),
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginWithEmailPasswordSuccess),
    tap(() => {
      this.router.navigate(['/']).then();
    }),
  ), { dispatch: false });

  signup$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.signupWithEmailPassword),
    exhaustMap(({ username, password }) =>
      this.authService.signupWithEmailPassword(username, password),
    ),
    map((signUpResponse: SignupResponse) => AuthActions.signupWithEmailPasswordSuccess({ signUpResponse })),
  ));

  signupSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.signupWithEmailPasswordSuccess),
    tap((res) => console.log(res)),
    tap(() => {
      this.router.navigate(['account', 'login']).then();
    }),
    // Alert the user to verify email
  ), { dispatch: false });

  signupFailure$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.signupWithEmailPasswordFailure),
    tap(({ msg, code }) => this.showAuthSnackbar(msg)),
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => this.authService.logout()),
    tap(() => {
      this.showAuthSnackbar('Logged out!');
      this.router.navigate(['/']).then();
    }),
  ), { dispatch: false });

  private showAuthSnackbar(message: string) {
    const action = 'Dismiss';
    this.snackbar.open(message, action, { duration: 3000 });
  }
}
