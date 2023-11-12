import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserProfile } from 'src/app/shared/types';

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
}
