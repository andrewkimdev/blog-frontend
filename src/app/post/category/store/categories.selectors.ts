import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from './categories.reducer';

export const selectAvailableCategories = createFeatureSelector<CategoriesState>('categoriesFeatureKey');
export const selectCategories = createSelector(
  selectAvailableCategories,
  (state) => state.categories,
);
