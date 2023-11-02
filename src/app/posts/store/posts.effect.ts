import { Injectable } from '@angular/core';
import { catchError, EMPTY, exhaustMap, map, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PostsService } from '../services/posts.service';

import * as PostsAction from './posts.action';

@Injectable()
export class PostsEffects {

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
  ){}


  loadPosts$ = createEffect(() => this.actions$.pipe(
    ofType(PostsAction.loadPosts),
    exhaustMap(() => this.postsService.getAll().pipe(
      map((posts) => PostsAction.postsLoadSuccess({ posts })),
      tap((res) => console.log(res)),
    )),
    catchError(() => EMPTY),
  ));
}
