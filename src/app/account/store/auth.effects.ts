import { Injectable } from '@angular/core';
import { catchError, EMPTY, exhaustMap, map, tap } from 'rxjs';
import { Router } from '@angular/router';
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
  ) {
  }

  init$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.init),
    map(() => {
      const res = localStorage.getItem('user');
      if (res) {
        const { token, profile } = JSON.parse(res);

        return isTokenInEffectiveTimeframe(token)
          ? AuthActions.rehydrateAuthState({ token, profile })
          : AuthActions.tokenNotInEffectiveTimeframe();
      } else {
        return AuthActions.noOp();
      }
    }),
  ));

  rehydrateAuthEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.rehydrateAuthState),
    tap(() => {
      this.router.navigate(['/']).then();
    }),
  ), { dispatch: false });

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
      this.router.navigate(['/']).then();
    }),
  ), { dispatch: false });
}
