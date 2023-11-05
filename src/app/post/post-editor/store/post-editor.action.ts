import { createAction, props } from '@ngrx/store';

export const createPost = createAction(
  '[PostEditor Page] Create a brand new single-post-home at server',
);

export const createPostFailure = createAction(
  'ERROR - [PostEditor Page] Create a brand new single-post-home at server',
  props<{ err: any }>(),
)

export const initPost = createAction(
  '[PostEditor Page] Init a single-post-home with id & timestamp from server',
  props<{ id: number, createdAt: number }>(),
)

export const moveToEditorRoute = createAction(
  '[PostEditor Page] Move to editor route',
  props<{ id: number }>(),
);

export const savePost = createAction(
  '[PostEditor Page] Save single-post-home',
);

export const abandonPostEdit = createAction(
  '[PostEditor Page] Cancel single-post-home edit',
);

export const clearPost = createAction(
  '[PostEditor Page] Clear Post Edit cache',
);

export const setPostId = createAction(
  '[PostEditor Page] Set single-post-home id as id is null',
  props<{ id: number }>(),
)
export const updateTitle = createAction(
  '[PostEditor Page] Update title',
  props<{ title: string }>(),
);

export const updateText = createAction(
  '[PostEditor Page] Update text',
  props<{ body: string }>(),
);

export const setIsDraftState = createAction(
  '[PostEditor Page] Set isDraft state',
  props<{ isDraft: boolean }>()
);

export const selectCategory = createAction(
  '[PostEditor Page] Select category',
  props<{ category: string }>(),
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
  '[PostEditor Page] Add an image to single-post-home',
  props<{ imageId: string }>(),
);

export const removeImage = createAction(
  '[PostEditor Page] Remove an image to single-post-home',
  props<{ index: number }>(),
);
