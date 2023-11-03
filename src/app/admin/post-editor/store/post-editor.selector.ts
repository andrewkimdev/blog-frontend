import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostEditorState } from './post-editor.reducer';

export const selectPostEditorFeature = createFeatureSelector<PostEditorState>('postEditorFeatureKey');
export const selectPost = createSelector(
  selectPostEditorFeature,
  (state) => state.post,
);

export const selectPostTags = createSelector(
  selectPost,
  (post) => post.tags,
);

