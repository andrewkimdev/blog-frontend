import { Injectable } from '@angular/core';
import { catchError, EMPTY, exhaustMap, map, tap } from 'rxjs';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { isTokenInEffectiveTimeframe } from 'src/app/shared/functions';

import { AuthService } from '../auth.service';

import * as AuthActions from './auth.actions';

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

  showAuthSnackbar(message: string) {
    const action = 'Dismiss';
    this.snackbar.open(message, action, { duration: 3000 });
  }

  init$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.init),
    map(() => {
      const res = localStorage.getItem('user');
      if (res) {
        const { token, profile } = JSON.parse(res);

        if (isTokenInEffectiveTimeframe(token)) {
          return AuthActions.rehydrateAuthStateSuccess({ token, profile })
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
      this.authService.loginWithEmailPassword(username, password).pipe(
        tap(({ token, profile }) => {
          const msg = profile.name ? `You are logged in as, ${profile.name}!` : 'Welcome!'
          this.showAuthSnackbar(msg);
          if (rememberMe) {
            localStorage.setItem('user', JSON.stringify({ token, profile }));
          }
        }),
      )
    ),
    // store credential in localStorage or cookie... if 'rememberMe is true
    map(({ token, profile }) =>
      AuthActions.loginWithEmailPasswordSuccess({ token, profile })
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

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => localStorage.removeItem('user')),
    tap(() => {
      this.showAuthSnackbar('Logged out!');
      this.router.navigate(['/']).then();
    }),
  ), { dispatch: false });
}
