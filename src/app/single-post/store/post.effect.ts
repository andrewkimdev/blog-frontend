import { Injectable } from '@angular/core';
import { catchError, EMPTY, exhaustMap, map, of, tap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { selectPosts } from 'src/app/posts/store/posts.selector';

import * as PostAction from './post.action';
import { PostService } from '../service/post.service';
import { select, Store } from '@ngrx/store';

@Injectable()
export class PostViewerEffects {

  constructor(
    private actions$: Actions,
    private postService: PostService,
    private store: Store,
  ) {}

  loadPost$ = createEffect(() => this.actions$.pipe(
    ofType(PostAction.loadPostById),
    withLatestFrom(this.store.pipe(select(selectPosts))),
    map(([action, posts]) => {
      const post = posts.find(post => post.id === action.id);
      return post ? PostAction.loadPostByIdSuccess({ post }) :  PostAction.loadPostByIdFailure();
    }),
    catchError(() => EMPTY),
  ));
}
