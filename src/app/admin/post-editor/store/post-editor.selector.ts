import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostEditorState } from './post-editor.reducer';

export const selectPostEditorFeature = createFeatureSelector<PostEditorState>('postEditorFeatureKey');
export const selectPostEditor = createSelector(
  selectPostEditorFeature,
  (state) => state.post,
);

export const selectPostEditorTag = createSelector(
  selectPostEditor,
  (post) => post.tags,
);

