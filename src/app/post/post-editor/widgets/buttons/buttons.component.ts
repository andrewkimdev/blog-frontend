import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, skip, Subject, take, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as PostEditorAction from '../../store/post-editor.action';
import { selectPost } from '../../store/post-editor.selector';
import { Post } from 'src/app/shared/types';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit, OnDestroy {
  isDraftInputControl = new FormControl(false);
  private destroy$ = new Subject<void>();

  post$: Observable<Post> = this.store.select(selectPost);

  constructor(private store: Store) {
  }

  onSaveButtonClicked(): void {
    this.store.dispatch(PostEditorAction.savePost());
  }

  onCancelButtonClicked(): void {
    this.store.dispatch(PostEditorAction.abandonPostEdit());
  }

  ngOnInit(): void {
    this.reactToInputControlChanges();
    this.setInitialValue();
  }

  private reactToInputControlChanges(): void {
    this.isDraftInputControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      skip(1),
      map((value) => !!value),
      tap((isDraft: boolean) => this.store.dispatch(PostEditorAction.setIsDraftState({ isDraft }))),
    ).subscribe();
  }

  private setInitialValue(): void {
    this.post$.pipe(
      filter((post) => !!post.id),
      take(1),
      tap((post) => {
        this.isDraftInputControl.setValue(post.isDraft);
        this.isDraftInputControl.markAsPristine();
      }),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
