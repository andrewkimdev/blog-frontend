import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/shared/types';

export const loadPostsFromCache = createAction(
  '[Posts Page] Load Posts from Cache',
);

export const loadPostsFromServer = createAction(
  '[Posts Page] Load Posts from Server'
);

export const postsLoadSuccess = createAction(
  '[Posts Page] Posts Loaded Success',
  props<{ posts: Post[] }>(),
);

export const postsLoadFailure = createAction(
  '[Post Page] Posts Load Failure',
);

export const savePost = createAction(
  '[Posts Page] Save single-post-home to view list',
  props<{ post: Post }>(),
);
