import { createReducer, on } from '@ngrx/store';
import * as PageEditorActions from './post-editor.action';
import { Post } from 'src/app/shared/types';

import {
  getCurrentUnixTimeInSeconds,
  duplicatePost as duplicate,
} from 'src/app/shared/functions';

const initialState: Post = {
  id: null,
  authorId: null,
  title: '',
  body: '',
  category: '',
  tags: [],
  isDraft: true,
  createdAt: getCurrentUnixTimeInSeconds(),
  updatedAt: null,
  mainImage: null,
  imageIdList: [],
};

export const postEditorReducer = createReducer(
  initialState,
  on(PageEditorActions.updateTitle, (state, { title }) => ({ ...duplicate(state), title })),
  on(PageEditorActions.selectCategory, (state, { category }) => ({ ...duplicate(state), category })),
  on(PageEditorActions.setIsDraftState, (state, { isDraft }) => ({ ...duplicate(state), isDraft })),
  on(PageEditorActions.updateText, (state, { text }) => ({ ...duplicate(state), text })),
);
