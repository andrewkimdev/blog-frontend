import { Injectable } from '@angular/core';
import { catchError, EMPTY, exhaustMap, map, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import { PostService } from '../services/post.service';

import * as PostAction from './post.action';
import { selectPosts } from '../../post-list/store/posts.selector';

@Injectable()
export class PostViewerEffects {

  constructor(
    private store: Store,
    private postService: PostService,
    private actions$: Actions,
  ) {}

  loadCachedPost$ = createEffect(() => this.actions$.pipe(
    ofType(PostAction.loadPostByIdFromCache),
    withLatestFrom(this.store.pipe(select(selectPosts))),
    map(([action, posts]) => {
      const post = posts.find(post => post.id === action.id);
      return post ? PostAction.loadPostByIdSuccess({ post }) :  PostAction.loadPostByIdFromServer({ id: action.id });
    }),
    catchError(() => EMPTY),
  ));

  loadPost$ = createEffect(() => this.actions$.pipe(
    ofType(PostAction.loadPostByIdFromServer),
    exhaustMap(({ id }) => this.postService.getOneById(id)),
    map((post) => {
      return PostAction.loadPostByIdSuccess({ post });
    }),
    catchError(() => EMPTY),
  ))
}
