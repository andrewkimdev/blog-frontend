import { createReducer, on } from '@ngrx/store';

import { UserProfile } from 'src/app/shared/types';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  profile: UserProfile | null;
}

const initialState: AuthState = {
  token: null,
  profile: null,
}

export const authReducer = createReducer(
  initialState,
  on(AuthActions.rehydrateAuthState, (state, { token, profile }) =>
    ({ ...state, token, profile })),
  on(AuthActions.loginWithEmailPasswordSuccess, (state, { token, profile }) =>
    ({ ...state, token, profile })),
  on(AuthActions.tokenNotInEffectiveTimeframe, (state) =>
    ({ ...state, token: null, profile: null, })),
  on(AuthActions.logout, (state) =>
    ({ ...state, token: null, profile: null, })),
);
