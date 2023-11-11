import { createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/shared/types';
import * as PostsManagerActions from './posts-manager.actions';

export interface PostsManagerState {
  posts: Post[];
}

const initialState: PostsManagerState = { posts: [] };

export const postsManagerReducer = createReducer(
  initialState,
  on(PostsManagerActions.postsLoadSuccess, (_, { posts }) => ({ posts })),
);
