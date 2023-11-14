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
    const updatedPost: Post[] = state.posts.filter((p: Post): boolean => p.id !== id);
    return { ...state, posts: updatedPost };
  }),
  on(PostsManagerActions.publishPost, (state, { id }) =>
    setIsDraftState(state, id, false)
  ),
  on(PostsManagerActions.hidePublishedPost, (state, { id }) =>
    setIsDraftState(state, id, true)
  ),
);

function setIsDraftState(state: PostsManagerState, id: number, isDraft: boolean) {
  const updatedPosts: Post[] =
    state.posts.map((p: Post) =>
      p.id === id
        ? duplicatePost(p, { isDraft })
        : p
    );
  return { ...state, posts: updatedPosts };
}
