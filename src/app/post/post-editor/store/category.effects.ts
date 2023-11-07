import { Injectable } from '@angular/core';
import { exhaustMap, filter, map, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CategoryService } from 'src/app/post/post-editor/widgets/categories/category.service';

import { Category } from 'src/app/shared/types';

import * as CategoryActions from './category.action';
import { selectAvailableCategories } from './category.selectors';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private categoryService: CategoryService,
  ) {
  }

  readonly categories$ = this.store.select(selectAvailableCategories);

  fetchCategoriesFromServer$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.fetchCategories),
    exhaustMap(() => this.categoryService.getCategories()),
    map((categories: Category[]) => CategoryActions.fetchCategoriesSuccess({ categories })),
  ));

  addCategoryAtServer$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.addCategory),
    withLatestFrom(this.categories$),
    filter((categories) => !!categories),
    map(([{ name }, categories]) => ({ name, categories: categories || [] as Category[] })),
    filter(({ name, categories }) =>
      !categories.some((c) => c.name.toLowerCase() === name.toLowerCase())
    ),
    map(({ name, categories }) => {
      const c: Category = { name };
      return [...categories, c]
    }),
    map((categories) => CategoryActions.fetchCategoriesSuccess({ categories })),
  ));
}
