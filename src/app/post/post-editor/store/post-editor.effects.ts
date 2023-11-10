import { Injectable } from '@angular/core';
import { exhaustMap, filter, map, switchMap, } from 'rxjs';
import { Router } from '@angular/router';

import { PostEditorService } from '../services/post-editor.service';
import { PostService } from '../../single-post/services/post.service';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PostEditorAction from './post-editor.action';
import * as PostsAction from '../../post-list/store/posts.action';
import { selectPost } from './post-editor.selector';

@Injectable()
export class PostEditorEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store,
    private postEditorService: PostEditorService,
    private postService: PostService,
  ) {
  }

  post$ = this.store.select(selectPost);

  hydratePost$ = createEffect(() => this.actions$.pipe(
    // todo - add case when post id is invalid or server is not available
    ofType(PostEditorAction.hydratePostByPostId),
    exhaustMap(({ id }) => this.postService.getOneById(id)),
    map((post) => PostEditorAction.fillInPage({ post })),
  ));

  savePostAtServer$ = createEffect(() => this.actions$.pipe(
    ofType(PostEditorAction.savePost),
    switchMap(() => this.post$),
    filter((post) => !!post.id),
    exhaustMap((post) => this.postEditorService.updatePost(post)),
    map((post) => PostsAction.savePost({ post })),
  ));

  moveToNewPostEditorRoute$ = createEffect(() => this.actions$.pipe(
    ofType(PostEditorAction.moveToEditorRoute),
    map((action) => action.id),
    exhaustMap((id) => this.router.navigateByUrl(`/posts/${id}/edit`))
  ), { dispatch: false });
}
