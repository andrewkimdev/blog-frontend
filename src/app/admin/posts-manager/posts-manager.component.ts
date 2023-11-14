import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { FormArray, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Post } from 'src/app/shared/types';

import { deletePostByIdFromServer, loadPostsFromServer } from './store/posts-manager.actions';
import * as PostsManagerActions from './store/posts-manager.actions';
import * as PostsManagerSelector from './store/posts-manager.selectors';

@Component({
  selector: 'app-posts-manager',
  templateUrl: './posts-manager.component.html',
  styleUrls: ['./posts-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsManagerComponent implements OnInit, OnDestroy {
  posts$: Observable<Post[]> = this.store.select(PostsManagerSelector.selectPosts).pipe(
    filter((posts: Post[]): boolean => posts.length > 0),
  );

  displayedColumns: string[] = ['id', 'category', 'createdAt', 'title', 'author', 'isPublished', 'action'];

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ){
  }

  private destroy$ = new Subject<void>();

  form = this.fb.group({
    isPublishedStates: this.fb.array([])
  });

  get isPublishedStates() {
    return this.form.get('isPublishedStates') as FormArray;
  }

  onDeleteClicked(event: MouseEvent, postId: number) {
    event.stopPropagation();
    const res = confirm("Really delete post?");
    if (res) {
      this.store.dispatch(deletePostByIdFromServer({ id: postId }));
    }
  }

  onPublishedSwitchChanged(event: MatSlideToggleChange, index: number): void {
    const postId = event.source.name ? +event.source.name: 0;
    if (!postId) {
      return;
    }
    const actionToDispatch = event.checked ?
      PostsManagerActions.publishPost({ id: postId }) :
      PostsManagerActions.hidePublishedPost({ id: postId });

    if (this.confirmAction(event.checked)) {
      this.store.dispatch(actionToDispatch);
    } else {
      this.resetToggleState(index, event.checked);
    }
  }

  private confirmAction(isPublishing: boolean): boolean {
    const msg = isPublishing
      ? 'Make the post visible?'
      : 'Hide the published post from public view?'

    return confirm(msg);
  }

  private resetToggleState(index: number, currentState: boolean): void {
    const control = this.isPublishedStates.get(index.toString());
    if (control) {
      control.setValue(!currentState, { emitEvent: false });
    }
  }

  viewPostInNewTab(postId: number) {
    window.open('/posts/' + postId, '_blank');
  }

  private refreshDraftStates() {
    // todo - revisit for pagination
    this.posts$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((posts) => {
      while(this.isPublishedStates.length !== 0) {
        this.isPublishedStates.removeAt(0);
      }
      posts.forEach((post) => {
        this.isPublishedStates.push(this.fb.control(!post.isDraft))
      });
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadPostsFromServer());
    this.refreshDraftStates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
