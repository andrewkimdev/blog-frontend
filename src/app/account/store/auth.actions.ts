import { createAction, props } from '@ngrx/store';
import { Session } from '@supabase/supabase-js';

import { SignupResponse, SupabaseUser } from 'src/app/shared/types';

export const init = createAction(
  '[Auth] Init Login Status'
);

export const noOp = createAction(
  '[Auth] No operation'
);

export const rehydrateAuthStateSuccess = createAction(
  '[Auth] Rehydrate auth status',
  props<{ session: Session }>(),
);

export const tokenNotInEffectiveTimeframe = createAction(
  '[Auth] Auth token NOT in effective time frame',
);

export const loginWithEmailPassword = createAction(
  '[Auth] Login with Email/Password',
  props<{ username: string, password: string, rememberMe: boolean }>(),
);

export const loginWithEmailPasswordSuccess = createAction(
  '[Auth] Login with Email/Password Success',
  props<{ user: SupabaseUser, session: Session }>(),
);
export const loginWithEmailPasswordFailure = createAction(
  '[Auth] Login with Email/Password Failure',
);

export const loginJwtCredentialExpired = createAction(
  '[Auth] JWT Credential Expired',
);

export const logout = createAction(
  '[Auth] Logout',
);

export const signupWithEmailPassword = createAction(
  '[Auth] Signup with Email/Password',
  props<{ username: string, password: string }>(),
);

export const signupWithEmailPasswordSuccess = createAction(
  '[Auth] Signup with Email/Password Success',
  props<{ signUpResponse: SignupResponse }>(),
);

export const signupWithEmailPasswordFailure = createAction(
  '[Auth] Signup with Email/Password Failure',
  props<{ code: number, msg: string}>(),
);
