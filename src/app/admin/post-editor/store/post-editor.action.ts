import { createAction, props } from '@ngrx/store';

export const initPostEditor = createAction(
  '[PostEditor Page] Init post editor',
  props<{ id: number }>(),
)
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

export const cancel = createAction(
  '[PostEditor Page] Cancel post edit',
);

export const addTag = createAction(
  '[PostEditor Page] Add tag',
  props<{ tag: string }>(),
);

export const removeTag = createAction(
  '[PostEditor Page] Remove tag',
  props<{ tag: string }>(),
);

export const setMainImage = createAction(
  '[PostEditor Page] Set image as main image',
  props<{ imageId: string }>(),
);

export const unsetMainImage = createAction(
  '[PostEditor Page] Unset image main image',
);

export const addImage = createAction(
  '[PostEditor Page] Add an image to post',
  props<{ imageId: string }>(),
);

export const removeImage = createAction(
  '[PostEditor Page] Remove an image to post',
  props<{ index: number }>(),
);
