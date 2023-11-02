import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/shared/types';

export const loadPostById = createAction(
  '[Single Post Page] Load Post by ID',
  props<{ id: number }>(),
);

export const loadPostByIdSuccess = createAction(
  '[Single Post Page] Load Post by ID Success',
  props<{ post: Post }>(),
);

export const loadPostByIdFailure = createAction(
  '[Single Post Page] Load Post by ID Failure',
  props<{ id: number}>(),
);
