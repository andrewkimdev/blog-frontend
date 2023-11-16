import { Injectable } from '@angular/core';
import { catchError, EMPTY, from, map, Observable, take, tap, } from 'rxjs';

import { Store } from '@ngrx/store';

import { AuthError } from '@supabase/supabase-js';
import { supabase } from 'src/app/shared/lib';

import { SignupResponse, LoginResponse } from 'src/app/shared/types';

import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private store: Store,
  ) {}

  loginWithEmailPassword(username: string, password: string): Observable<LoginResponse> {
    return from(supabase.auth.signInWithPassword({ email: username, password})).pipe(
      tap((res) => console.log(res)),
      map(({ data}) => data as LoginResponse),
      catchError((err: AuthError) => {
        const _err = `${err.name}: ${err.message}`;
        console.error(_err);
        throw Error(_err);
      }),
    );
  }

  signupWithEmailPassword(username: string, password: string): Observable<SignupResponse> {
    return from(supabase.auth.signUp({
      email: username, password
    })).pipe(
      map(({ data, error }) => {
        if (error) {
          throw Error(error.message);
        }
        return data as unknown as SignupResponse;
      }),
      catchError((err: { code: number; msg: string }) => {
        const { code, msg } = err;
        this.store.dispatch(AuthActions.signupWithEmailPasswordFailure({ code, msg }));

        console.error(err);
        return EMPTY;
      }),
    );
  }

  // Handles local storage clearing in the sdk method
  logout() {
    from(supabase.auth.signOut()).pipe(
      take(1),
    ).subscribe();
  }
}
