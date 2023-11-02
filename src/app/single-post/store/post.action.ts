import { createAction, props } from '@ngrx/store';

export const loadPostById = createAction(
  '[Post Page] Load Post by ID',
  props<{ id: number }>(),
)
