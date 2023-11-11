import { createReducer, on } from '@ngrx/store';

import { duplicatePost } from 'src/app/shared/functions';
import { Post } from 'src/app/shared/types';

import * as PostsManagerActions from './posts-manager.actions';

export interface PostsManagerState {
  posts: Post[];
}

const initialState: PostsManagerState = { posts: [] };

export const postsManagerReducer = createReducer(
  initialState,
  on(PostsManagerActions.postsLoadSuccess, (_, { posts }) => ({ posts })),
  on(PostsManagerActions.deletePostByIdFromServer, (state, { id }) => {
    const updatedPost: Post[] = state.posts
      .filter((p) => p.id !== id)
      .map((p: Post) => duplicatePost(p));
    return { ...state, posts: updatedPost };
  }),
);