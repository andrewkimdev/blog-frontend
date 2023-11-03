import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/shared/types';

export const loadPostByIdFromCache = createAction(
  '[Single Post Page] Load Post by ID from cache',
  props<{ id: number }>(),
);

export const loadPostByIdFromServer = createAction(
  '[Single Post Page] Load Post by ID from Server',
  props<{ id: number}>(),
);

export const loadPostByIdSuccess = createAction(
  '[Single Post Page] Load Post by ID Success',
  props<{ post: Post }>(),
);

