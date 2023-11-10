import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Post } from 'src/app/shared/types';
import { PostEditorState } from './post-editor.reducer';


export const selectPostEditorFeature = createFeatureSelector<PostEditorState>('postEditorFeatureKey');
export const selectPost = createSelector(
  selectPostEditorFeature,
  (state) => state.post,
);
export const selectIsDirty = createSelector(
  selectPostEditorFeature,
  (state) => state.isDirty,
);

export const selectPostTags = createSelector(
  selectPost,
  (post: Post) => post.tags,
);
