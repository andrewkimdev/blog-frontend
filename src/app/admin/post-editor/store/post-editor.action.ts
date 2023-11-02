import { createAction, props } from '@ngrx/store';

export const createPost = createAction(
  '[PostEditor Page] Create a brand new post'
);

export const updateTitle = createAction(
  '[PostEditor Page] Update title',
  props<{ title: string }>(),
);

export const updateText = createAction(
  '[PostEditor Page] Update text',
  props<{ text: string}>(),
);

export const setIsDraftState = createAction(
  '[PostEditor Page] Set isDraft state',
  props<{ isDraft: boolean }>()
);

export const selectCategory = createAction(
  '[PostEditor Page] Select category',
  props<{ category: string }>(),
)

export const save = createAction(
  '[PostEditor Page] Save post',
);
