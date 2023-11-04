import { createReducer, on } from '@ngrx/store';
import * as PageEditorActions from './post-editor.action';
import { Post } from 'src/app/shared/types';

import {
  createBlankPost,
  duplicatePost,
} from 'src/app/shared/functions';

export interface PostEditorState {
  post: Post;
  isDirty: boolean;
}
const initialState: PostEditorState = { post: createBlankPost(), isDirty: false };

export const postEditorReducer = createReducer(
  initialState,
  on(PageEditorActions.initPost, (state,{ id, createdAt }) => {
    const post = duplicatePost(state.post, { id, createdAt });
    return { ...state, post, isDirty: false };
  }),
  on(PageEditorActions.updateTitle, (state, { title }) => {
    const post = duplicatePost(state.post, { title });
    return { ...state, post, isDirty: true };
  }),
  on(PageEditorActions.selectCategory, (state, { category }) => {
    const post = duplicatePost(state.post, { category });
    return { ...state, post, isDirty: true };
  }),
  on(PageEditorActions.setIsDraftState, (state, { isDraft }) => {
    const post = duplicatePost(state.post, { isDraft });
    return { ...state, post, isDirty: true };
  }),
  on(PageEditorActions.updateText, (state, { text }) => {
    const post = duplicatePost(state.post, { text });
    return { ...state, post, isDirty: true };
  }),
  on(PageEditorActions.addTag, (state, { tag }) => {
    const exists = tag && state.post.tags.some(t => t.toLowerCase() === tag.toLowerCase());
    return exists ? state : { ...state, post: { ...state.post, tags: [...state.post.tags, tag], isDirty: true } };
  }),
  on(PageEditorActions.removeTag, (state, { tag }) => {
    const updatedTags: string[] = state.post.tags.filter((t: string) => t !== tag);
    const post = duplicatePost(state.post, { tags: updatedTags });
    return { ...state, post, isDirty: true };
  }),
  on(PageEditorActions.savePost, (state) => {
    const post = duplicatePost(state.post);
    return { ...state, post, isDirty: false };
  }),
  on(PageEditorActions.setMainImage, (state, { imageId }) => {
    const post: Post = duplicatePost(state.post, { mainImage: imageId });
    return { ...state, post, isDirty: true };
  }),
  on(PageEditorActions.unsetMainImage, (state) => {
    const post: Post = duplicatePost(state.post, { mainImage: null });
    return { ...state, post, isDirty: true };
  }),
  on(PageEditorActions.addImage, (state, { imageId }) => {
    const post: Post = duplicatePost(state.post, { imageIdList: [...state.post.imageIdList, imageId] });
    return { ...state, post, isDirty: true };
  }),
  on(PageEditorActions.removeImage, (state, { index }) => {
    const post: Post = duplicatePost(state.post, { imageIdList: state.post.imageIdList.filter((_, i) => i !== index) });
    return { ...state, post, isDirty: true };
  }),
);
