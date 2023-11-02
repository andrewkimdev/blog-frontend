import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SinglePostViewerState } from './post.reducer';

export const selectSinglePostViewerFeature = createFeatureSelector<SinglePostViewerState>('singlePostViewerFeatureKey');

export const selectSinglePost = createSelector(
  selectSinglePostViewerFeature,
  (state: SinglePostViewerState) => state.post,
);
