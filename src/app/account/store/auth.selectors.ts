import { createFeatureSelector, createSelector } from '@ngrx/store';
import { isTokenInEffectiveTimeframe } from 'src/app/shared/functions';
import { AuthState } from './auth.reducers';

export const selectAuthFeature = createFeatureSelector<AuthState>('authFeatureKey');

export const selectToken = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.token,
);

export const selectProfile = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.profile,
);

export const selectIsLoggedIn = createSelector(
  selectToken,
  ((token: string | null): boolean =>
      token ? isTokenInEffectiveTimeframe(token) : false
  ),
);
