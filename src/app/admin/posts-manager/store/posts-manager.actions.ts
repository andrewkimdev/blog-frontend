import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/shared/types';

export const loadPostsFromServer = createAction(
  '[Posts Manager Page] Load Posts from Server',
);

export const postsLoadSuccess = createAction(
  '[Posts Manager Page] Post Loading SUCCESS',
  props<{ posts: Post[] }>(),
)
