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
  on(PostsAction.savePost, savePostHandler),
);

function savePostHandler(state: PostsState, { post }: { post: Post }) {
    const existingPostIndex = state.posts.findIndex(existingPost => existingPost.id === post.id);
    const updatedPostList: Post[] = existingPostIndex > -1
      ? state.posts.map((currentPost, index) => index === existingPostIndex ? post : currentPost)
      : [...state.posts, post];
    return {
      ...state,
      posts: updatedPostList,
    };
}
