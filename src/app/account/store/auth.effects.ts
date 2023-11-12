import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, exhaustMap, map, tap } from 'rxjs';
import { AuthService } from 'src/app/account/auth.service';
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
        return AuthActions.rehydrateAuthState({ token, profile });
      } else {
        return AuthActions.noOp();
      }
    }),
  ));

  rehydrateAuthEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.rehydrateAuthState),
    tap(({ token, profile }) => {
      this.router.navigate(['/'])
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
}
