import { Injectable } from '@angular/core';
import { exhaustMap, map, switchMap, tap, } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostEditorService } from 'src/app/admin/post-editor/post-editor.service';
import { selectPost } from 'src/app/admin/post-editor/store/post-editor.selector';

import * as PostEditorAction from './post-editor.action';
import * as PostsAction from '../../../posts/store/posts.action';

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
    tap((res) => console.log(res)),
    exhaustMap(( post ) => this.postEditorService.updatePost(post)),
    map((post) => PostsAction.addNewPost({ post })),
  ));

  moveToNewPostEditorRoute$ = createEffect(() => this.actions$.pipe(
    ofType(PostEditorAction.moveToEditorRoute),
    map((action) => action.id),
    exhaustMap((id) => this.router.navigateByUrl(`/admin/posts/${id}/edit`))
  ), { dispatch: false });
}
