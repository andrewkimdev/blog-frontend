import { createFeatureSelector, createSelector } from '@ngrx/store';
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
