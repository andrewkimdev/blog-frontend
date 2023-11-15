import { createReducer, on } from '@ngrx/store';

import { UserProfile } from 'src/app/shared/types';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  profile: UserProfile | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: null,
  profile: null,
  isLoggedIn: false,
}

export const authReducer = createReducer(
  initialState,
  on(AuthActions.rehydrateAuthStateSuccess, (state, { token, profile }) =>
    ({ ...state, token, profile, isLoggedIn: true, })),
  on(AuthActions.loginWithEmailPasswordSuccess, (state, { token, profile }) =>
    ({ ...state, token, profile, isLoggedIn: true, })),
  on(AuthActions.tokenNotInEffectiveTimeframe, (state) =>
    ({ ...state, token: null, profile: null, })),
  on(AuthActions.signupWithEmailPasswordSuccess, (state, { signUpResponse }) => {
    return state; // todo - figure out what info to keep from signupResponse
  }),
  on(AuthActions.logout, (state) =>
    ({ ...state, token: null, profile: null, isLoggedIn: false, })),
);
