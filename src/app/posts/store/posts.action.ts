import { createAction, props } from '@ngrx/store';
import { Post } from '../../shared/types';

export const loadPosts = createAction(
  '[Posts Page] Load Posts',
);

export const postsLoadSuccess = createAction(
  '[Posts Page] Posts Loaded Success',
  props<{ posts: Post[]}>(),
);
