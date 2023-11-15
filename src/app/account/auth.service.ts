import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, from, map, Observable, } from 'rxjs';

import { supabase } from 'src/supabase';

import { SignUpResponse, UserProfile } from 'src/app/shared/types';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) {
  }

  loginWithEmailPassword(username: string, password: string): Observable<{ token: string, profile: UserProfile }> {
    return this.http.post<{ token: string, profile: UserProfile }>(`${ environment.baseUrl }/login`, { username, password });
  }

  signupWithEmailPassword(username: string, password: string): Observable<SignUpResponse> {
    return from(supabase.auth.signUp({
      email: username, password
    })).pipe(
      map(({ data, error }) => {
        if (error) {
          throw Error(error.message);
        }
        return data as SignUpResponse;
      }),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      }),
    );
  }
}
