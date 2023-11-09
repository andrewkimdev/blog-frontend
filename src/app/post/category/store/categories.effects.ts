import { Injectable } from '@angular/core';
import { exhaustMap, filter, map, Observable, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CategoriesService } from '../service/categories.service';

import { Category } from 'src/app/shared/types';

import { selectAvailableCategories } from './categories.selectors';
import * as CategoryActions from './categories.action';
import { CategoriesState } from './categories.reducer';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private categoriesService: CategoriesService,
  ) {
  }

  readonly categories$: Observable<CategoriesState> = this.store.select(selectAvailableCategories);

  fetchCategoriesFromServer$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.fetchCategories),
    exhaustMap(() => this.categoriesService.getCategories()),
    map((categories: Category[]) => CategoryActions.fetchCategoriesSuccess({ categories })),
  ));

  addCategoryAtServer$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.addCategory),
    withLatestFrom(this.categories$),
    filter(([{ name }, { categories } ]) => {
      return !!name && !categories.some((c) => c.name.toLowerCase() === name.toLowerCase());
    }),
    map(([{ name }, { categories } ]): Category => ({name})),
    exhaustMap(({ name }) => this.categoriesService.addCategory(name)),
  ), { dispatch: false });
}
