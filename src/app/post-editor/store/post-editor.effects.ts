import { Injectable } from '@angular/core';
import { exhaustMap, filter, map, switchMap, tap, } from 'rxjs';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostEditorService } from '../post-editor.service';
import { selectPost } from '../store/post-editor.selector';

import * as PostEditorAction from './post-editor.action';
import * as PostsAction from '../../posts/store/posts.action';

@Injectable()
export class PostEditorEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store,
    private postEditorService: PostEditorService,
  ){}

  post$ = this.store.select(selectPost);

  createNewPost$ = createEffect(() => this.actions$.pipe(
    ofType(PostEditorAction.createPost),
    exhaustMap(() => this.postEditorService.createNewPost()),
    map(({ id, createdAt}) => {
      const _id = id as number;
      return { id: _id, createdAt };
    }),
    tap(({ id, createdAt }) => this.store.dispatch(PostEditorAction.initPost({ id, createdAt }))),
    map(({ id }) => PostEditorAction.moveToEditorRoute({ id })),
  ));

  savePostAtServer$ = createEffect(() => this.actions$.pipe(
    ofType(PostEditorAction.savePost),
    switchMap(() => this.post$),
    filter((post) => !!post.id),
    exhaustMap(( post ) => this.postEditorService.updatePost(post)),
    map((post) => PostsAction.savePost({ post })),
  ));

  moveToNewPostEditorRoute$ = createEffect(() => this.actions$.pipe(
    ofType(PostEditorAction.moveToEditorRoute),
    map((action) => action.id),
    exhaustMap((id) => this.router.navigateByUrl(`/post-editor/${id}/edit`))
  ), { dispatch: false });
}
