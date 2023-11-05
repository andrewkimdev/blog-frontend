import { Injectable } from '@angular/core';
import { catchError, EMPTY, exhaustMap, map, tap, withLatestFrom } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PostsService } from '../services/posts.service';

import * as PostsAction from './posts.action';
import { selectPosts } from './posts.selector';


@Injectable()
export class PostsEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private postsService: PostsService,
  ){}

  loadPostsFromCache$ = createEffect(() => this.actions$.pipe(
    ofType(PostsAction.loadPostsFromCache),
    withLatestFrom(this.store.pipe(select(selectPosts))),
    map(([_, posts]) => {
      return posts.length === 0
        ? PostsAction.loadPostsFromServer()
        : PostsAction.postsLoadSuccess({ posts });
    }),
    catchError(() => EMPTY),
  ));

  loadPostsFromServer$ = createEffect(() => this.actions$.pipe(
    ofType(PostsAction.loadPostsFromServer),
    exhaustMap(() => this.postsService.getAll().pipe(
      map((posts) => PostsAction.postsLoadSuccess({ posts })),
      tap((res) => console.log(res)),
    )),
    catchError(() => EMPTY),
  ));
}
