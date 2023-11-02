import { Injectable } from '@angular/core';
import { catchError, EMPTY, exhaustMap, map, of, tap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

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

  // loadPost$ = createEffect(() => this.actions$.pipe(
  //   ofType(PostAction.loadPostById),
  //   tap(( { id }) => console.log(id)),
  //   // withLatestFrom(this.store.pipe(select(selectPostById))),
  //   // exhaustMap(() => of(null)),
  //   // find if it exists in the state
  //   // if fails, fetch from server. (// if this can be done, yes.)
  //   catchError(() => EMPTY),
  // ));
}
