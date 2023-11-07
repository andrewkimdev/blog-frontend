import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/shared/types';

export const addCategory = createAction(
  '[Category] Create a category',
  props<{ name: string }>(),
);

export const fetchCategoriesSuccess = createAction(
  '[Category] Hydrate categories',
  props<{ categories: Category[] }>(),
)

export const fetchCategories = createAction(
  '[Category] Retrieve categories from Server',
);
