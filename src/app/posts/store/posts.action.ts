import { createAction, props } from '@ngrx/store';
import { Post } from '../../shared/types';

export const loadPostsFromCache = createAction(
  '[Posts Page] Load Posts from Cache',
);

export const loadPostsFromServer = createAction(
  '[Posts Page] Load Posts from Server'
);

export const postsLoadSuccess = createAction(
  '[Posts Page] Posts Loaded Success',
  props<{ posts: Post[]}>(),
);

export const savePost = createAction(
  '[Posts Page] Add newly created/saved post',
  props<{ post: Post}>(),
);
