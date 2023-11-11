import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsManagerState } from 'src/app/admin/posts-manager/store/posts-manager.reducer';

export const selectPostsManagerFeature = createFeatureSelector<PostsManagerState>('postsManagerFeatureKey');

export const selectPosts = createSelector(
  selectPostsManagerFeature,
  (state: PostsManagerState) => state.posts,
)
