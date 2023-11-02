import { createReducer, on } from '@ngrx/store';
import { loadPostById } from './post.action';

import { Post } from 'src/app/shared/types';
import { createBlankPost, duplicatePost } from 'src/app/shared/functions';

export interface SinglePostViewerState {
  post: Post;
}

const initialState: SinglePostViewerState= { post: createBlankPost() }
export const singlePostViewerReducer = createReducer(
  initialState,
  // on(loadPostById, (state, { id }) => ({
  //   post: {
  //     ...duplicatePost(state.post),
  //     id
  //   },
  // })),
);
