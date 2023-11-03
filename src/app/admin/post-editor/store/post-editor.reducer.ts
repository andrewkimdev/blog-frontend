import { createReducer, on } from '@ngrx/store';
import * as PageEditorActions from './post-editor.action';
import { Post } from 'src/app/shared/types';

import {
  duplicatePost as duplicate, createBlankPost,
} from 'src/app/shared/functions';

export interface PostEditorState {
  post: Post;
}
const initialState: Post = createBlankPost();

export const postEditorReducer = createReducer(
  initialState,
  on(PageEditorActions.updateTitle, (state, { title }) => ({ ...duplicate(state), title })),
  on(PageEditorActions.selectCategory, (state, { category }) => ({ ...duplicate(state), category })),
  on(PageEditorActions.setIsDraftState, (state, { isDraft }) => ({ ...duplicate(state), isDraft })),
  on(PageEditorActions.updateText, (state, { text }) => ({ ...duplicate(state), text })),
  on(PageEditorActions.addTag, (state, { tag }) => {
    if (!tag || state.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())) {
      return state;
    }
    return { ...duplicate(state), tags: [...state.tags, tag] };
  }),
  on(PageEditorActions.removeTag, (state, { tag }) => {
    const updatedTags: string[] = state.tags.filter((t: string) => t !== tag);
    return { ...duplicate(state), tags: updatedTags };
  }),
);
