import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/shared/types';

export const addCategory = createAction(
  '[Categories] Create a category',
  props<{ name: string }>(),
);

export const fetchCategoriesSuccess = createAction(
  '[Categories] Hydrate categories',
  props<{ categories: Category[] }>(),
)

export const fetchCategories = createAction(
  '[Categories] Retrieve categories from Server',
);
