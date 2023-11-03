import { createReducer, on } from '@ngrx/store';
import * as PageEditorActions from './post-editor.action';
import { Post } from 'src/app/shared/types';

import {
  createBlankPost,
  duplicatePost,
} from 'src/app/shared/functions';

export interface PostEditorState {
  post: Post;
}
const initialState: { post: Post } = { post: createBlankPost() };

export const postEditorReducer = createReducer(
  initialState,
  on(PageEditorActions.initPostEditor, (state,{ id }) => {
    const post = duplicatePost(state.post, { id });
    return { post };
  }),
  on(PageEditorActions.updateTitle, (state, { title }) => {
    const post = duplicatePost(state.post, { title });
    return { post };
  }),
  on(PageEditorActions.selectCategory, (state, { category }) => {
    const post = duplicatePost(state.post, { category });
    return { post };
  }),
  on(PageEditorActions.setIsDraftState, (state, { isDraft }) => {
    const post = duplicatePost(state.post, { isDraft });
    return { post };
  }),
  on(PageEditorActions.updateText, (state, { text }) => {
    const post = duplicatePost(state.post, { text });
    return { post };
  }),
  on(PageEditorActions.addTag, (state, { tag }) => {
    const exists = tag && state.post.tags.some(t => t.toLowerCase() === tag.toLowerCase());
    return exists ? state : { ...state, post: { ...state.post, tags: [...state.post.tags, tag] } };
  }),
  on(PageEditorActions.removeTag, (state, { tag }) => {
    const updatedTags: string[] = state.post.tags.filter((t: string) => t !== tag);
    const post = duplicatePost(state.post, { tags: updatedTags });
    return { post };
  }),
);
