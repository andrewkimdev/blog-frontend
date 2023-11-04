import { createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/shared/types';
import * as PostsAction from './posts.action';

const initialState: PostsState = { posts: [] };

export interface PostsState {
  posts: Post[];
}

export const postsReducer = createReducer(
  initialState,
  on(PostsAction.postsLoadSuccess, (_, { posts }) => ({ posts })),
  on(PostsAction.addNewPost, (state, { post }) => (
    { ...state, posts: [...state.posts, post]}
  )),
);
