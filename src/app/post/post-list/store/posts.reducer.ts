import { createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/shared/types';
import * as PostsAction from './posts.action';

export interface PostsState {
  posts: Post[];
}

const initialState: PostsState = { posts: [] };

export const postsReducer = createReducer(
  initialState,
  on(PostsAction.postsLoadSuccess, (_, { posts }) => ({ posts })),
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
