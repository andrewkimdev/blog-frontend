import { createSelector } from '@ngrx/store';
import { PostEditorState } from './post-editor.reducer';
import { selectPostEditorFeature } from './post-editor.selector';

export const selectAvailableCategories = createSelector(
  selectPostEditorFeature,
  (state: PostEditorState) => state.categories,
)
