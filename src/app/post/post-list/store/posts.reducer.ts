import { createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/shared/types';
import * as PostsAction from './posts.action';

export interface PostsState {
  posts: Post[];
  error: string | null;
}

const initialState: PostsState = { posts: [], error: null };

export const postsReducer = createReducer(
  initialState,
  on(PostsAction.postsLoadSuccess, (state, { posts }) => ({ ...state, posts })),
  on(PostsAction.postsLoadFailure, (state) => ({...state })), // todo - add error state
  on(PostsAction.savePost, savePostHandler),
);

function savePostHandler(state: PostsState, { post }: { post: Post }) {
  if (!post.id || !post.title || !post.body || !post?.tags) {
    return state;
  }
  const existingPostIndex = state.posts.findIndex(existingPost => existingPost.id === post.id);
  const updatedPostList: Post[] = existingPostIndex > -1
    ? state.posts.map((currentPost, index) => index === existingPostIndex ? post : currentPost)
    : [...state.posts, post];
  return {
    ...state,
    posts: updatedPostList,
  };
}
