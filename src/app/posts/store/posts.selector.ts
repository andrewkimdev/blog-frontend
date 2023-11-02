import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';

export const selectPostsFeature = createFeatureSelector<PostsState>('postsFeatureKey');
export const selectPosts = createSelector(
  selectPostsFeature,
  (state: PostsState) => state.posts,
)
