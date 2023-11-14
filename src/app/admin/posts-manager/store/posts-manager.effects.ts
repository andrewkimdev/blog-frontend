import { Injectable } from '@angular/core';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PostsManagerService } from '../service/posts-manager.service';

import * as PostManagerActions from './posts-manager.actions';

@Injectable()
export class PostsManagerEffects {

  constructor(
    private actions$: Actions,
    private postsService: PostsManagerService,
  ) {
  }

  loadPostsFromServer$ = createEffect(() => this.actions$.pipe(
    ofType(PostManagerActions.loadPostsFromServer),
    exhaustMap(() => this.postsService.getAll().pipe(
      map((posts) => PostManagerActions.postsLoadSuccess({ posts })),
    )),
    catchError((err) => {
      console.error(err);
      return EMPTY
    }),
  ));

  deletePostByIdAtServer$ = createEffect(() => this.actions$.pipe(
    ofType(PostManagerActions.deletePostByIdFromServer),
    exhaustMap(({ id }) => this.postsService.deletePostById(id).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY
      }),
    )),
    map(({ id }) => PostManagerActions.deletePostByIdAtClient({ id }))
  ));

  setPostAsPublishedAtServer$ = createEffect(() => this.actions$.pipe(
    ofType(PostManagerActions.publishPost),
    exhaustMap(({ id }) => this.postsService.updatePublishedStateById(id, false)),
  ), { dispatch: false });

  setPostAsHidden$ = createEffect(() => this.actions$.pipe(
    ofType(PostManagerActions.hidePublishedPost),
    exhaustMap(({ id }) => this.postsService.updatePublishedStateById(id, true)),
  ), { dispatch: false });
}
