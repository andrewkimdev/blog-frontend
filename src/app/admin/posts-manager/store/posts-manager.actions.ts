import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/shared/types';

export const loadPostsFromServer = createAction(
  '[Posts Manager Page] Load Posts from Server',
);

export const postsLoadSuccess = createAction(
  '[Posts Manager Page] Post Loading SUCCESS',
  props<{ posts: Post[] }>(),
);

export const deletePostByIdFromServer = createAction(
  '[Post Manager Page] Delete Post from Server',
  props<{ id: number }>(),
);

export const deletePostByIdAtClient = createAction(
  '[Post Manager Page] Delete Post at Client',
  props<{ id: number }>(),
);
