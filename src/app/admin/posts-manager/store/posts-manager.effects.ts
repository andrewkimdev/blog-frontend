import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { PostsManagerService } from 'src/app/admin/posts-manager/service/posts-manager.service';
import * as PostManagerActions from './posts-manager.actions';
@Injectable()
export class PostsManagerEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private postsService: PostsManagerService,
  ) {
  }

  loadPostsFromServer$ = createEffect(() => this.actions$.pipe(
    ofType(PostManagerActions.loadPostsFromServer),
    exhaustMap(() => this.postsService.getAll().pipe(
      map((posts) => PostManagerActions.postsLoadSuccess({ posts })),
    )),
    catchError(() => EMPTY),
  ));
}
