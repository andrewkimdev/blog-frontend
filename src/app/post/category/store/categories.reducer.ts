import { createReducer, on } from '@ngrx/store';
import * as CategoryAction from './categories.action';

import { Category } from 'src/app/shared/types';


export interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = { categories: [] };


export const categoriesReducer = createReducer(
  initialState,
  on(CategoryAction.addCategory, (state, { name }) => {
    const categoryExists = state.categories.some((c) => c.name === name);
    return categoryExists
      ? state
      : { ...state, categories: [...state.categories, { name }] };
  }),
  on(CategoryAction.fetchCategoriesSuccess, (state, { categories }) => {
    // categories.((a, b) => a.name.localeCompare(b.name));
    return { ...state, categories };
  }),
);
