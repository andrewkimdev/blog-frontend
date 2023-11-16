import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { Session, User } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null,
  session: Session | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: { msg: string; code: number } | null;
}

const initialState: AuthState = {
  user: null,
  session: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
}

export const authReducer = createReducer(
  initialState,
  on(AuthActions.rehydrateAuthStateSuccess, (state, { session }) =>
    ({ ...state, user: session.user, session, isLoggedIn: true, error: null, })),
  on(AuthActions.loginWithEmailPasswordSuccess, (state, { user, session }) =>
    ({ ...state, user: session.user, session, isLoggedIn: true, error: null, })),
  on(AuthActions.tokenNotInEffectiveTimeframe, (state) =>
    ({ ...state, token: null, profile: null, error: { msg: 'Token not in effective time frame', code: 1 }})),
  on(AuthActions.signupWithEmailPassword, (state) =>
    ({ ...state, isLoading: true, error: null })),
  on(AuthActions.signupWithEmailPasswordSuccess, (state, { signUpResponse }) =>
    ({ ...state, user: signUpResponse.user, isLoading: false, error: null })),
  on(AuthActions.signupWithEmailPasswordFailure, (state, { code, msg }) =>
    ({ ...state, user: null, session: null, isLoading: false, error: { code, msg } })),
  on(AuthActions.logout, (state) =>
    ({ ...state, user: null, session: null, isLoggedIn: false, error: null, })),
);
