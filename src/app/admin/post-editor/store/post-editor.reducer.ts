import { createReducer, on } from '@ngrx/store';
import * as PageEditorActions from './post-editor.action';
import { Post } from 'src/app/shared/types';

import {
  createBlankPost,
  duplicatePost, getCurrentUnixTimeInSeconds,
} from 'src/app/shared/functions';

export interface PostEditorState {
  post: Post;
  isDirty: boolean;
}
const initialState: PostEditorState = { post: createBlankPost(), isDirty: false };

export const postEditorReducer = createReducer(
  initialState,
  on(PageEditorActions.initPostEditor, (state,{ id }) => {
    const post = duplicatePost(state.post, { id });
    return { post, isDirty: false };
  }),
  on(PageEditorActions.updateTitle, (state, { title }) => {
    const post = duplicatePost(state.post, { title });
    return { post, isDirty: true };
  }),
  on(PageEditorActions.selectCategory, (state, { category }) => {
    const post = duplicatePost(state.post, { category });
    return { post, isDirty: true };
  }),
  on(PageEditorActions.setIsDraftState, (state, { isDraft }) => {
    const post = duplicatePost(state.post, { isDraft });
    return { post, isDirty: true };
  }),
  on(PageEditorActions.updateText, (state, { text }) => {
    const post = duplicatePost(state.post, { text });
    return { post, isDirty: true };
  }),
  on(PageEditorActions.addTag, (state, { tag }) => {
    const exists = tag && state.post.tags.some(t => t.toLowerCase() === tag.toLowerCase());
    return exists ? state : { ...state, post: { ...state.post, tags: [...state.post.tags, tag], isDirty: true } };
  }),
  on(PageEditorActions.removeTag, (state, { tag }) => {
    const updatedTags: string[] = state.post.tags.filter((t: string) => t !== tag);
    const post = duplicatePost(state.post, { tags: updatedTags });
    return { post, isDirty: true };
  }),
  on(PageEditorActions.save, (state) => {
    const post = duplicatePost(state.post, { updatedAt: getCurrentUnixTimeInSeconds() });
    return { post, isDirty: false };
  }),
);
