import { createReducer, on } from '@ngrx/store';
import * as CategoryAction from './category.action';

export interface Category {
  name: string;
}
export interface CategoryState {
  categories: Category[];
}
const initialState: CategoryState = { categories: [] };


export const categoryReducer = createReducer(
  initialState,
  on(CategoryAction.addCategory, (state, { name }) => {
    const categoryExists = state.categories.some((c) => c.name === name);
    return categoryExists
      ? state
      : { ...state, categories: [...state.categories, { name }] };
  }),
  on(CategoryAction.fetchCategoriesSuccess, (state, { categories }) => {
    categories.sort((a, b) => a.name.localeCompare(b.name));
    return { ...state, categories };
  }),
);
