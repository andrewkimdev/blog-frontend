import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from './auth.reducers';

export const selectAuthFeature = createFeatureSelector<AuthState>('authFeatureKey');

export const selectToken = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.session?.access_token ?? '',
);

export const selectUser = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.session?.user ?? null,
);

export const selectIsLoggedIn = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.isLoggedIn,
);

export const selectIsLoading = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.isLoading,
);

export const selectError = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.error,
);
