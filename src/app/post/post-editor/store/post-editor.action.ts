import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/shared/types';

export const createPost = createAction(
  '[PostEditor Page] Create a brand new single-post-home at server',
);

export const createPostSuccess = createAction(
  '[PostEditor Page] Init a single-post-home with id & timestamp obtained from server',
  props<{ id: number, createdAt: number }>(),
);

export const createPostFailure = createAction(
  'ERROR - [PostEditor Page] Create a brand new single-post-home at server',
  props<{ err: any }>(),
);

export const hydratePostByPostId = createAction(
  '[PostEditor Page] Hydrate page from source',
  props<{ id: number }>(),
);

export const fillInPage = createAction(
  '[PostEditor Page] Fill in page with fetched post',
  props<{ post: Post }>(),
)

export const moveToEditorRoute = createAction(
  '[PostEditor Page] Move to editor route',
  props<{ id: number }>(),
);

export const savePost = createAction(
  '[PostEditor Page] Save single-post-home',
);

export const markPostAsPristine = createAction(
  '[PostEditor Page] Mark page as pristine',
)

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
export const setTitle = createAction(
  '[PostEditor Page] Set title',
  props<{ title: string }>(),
);

export const setBodyText = createAction(
  '[PostEditor Page] Set body text',
  props<{ body: string }>(),
);

export const setIsDraftState = createAction(
  '[PostEditor Page] Set isDraft state',
  props<{ isDraft: boolean }>()
);

export const setCategory = createAction(
  '[PostEditor Page] Select category',
  props<{ name: string }>(),
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
