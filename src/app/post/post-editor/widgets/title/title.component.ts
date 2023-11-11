import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, skip, Subject, take, takeUntil, tap } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Post } from 'src/app/shared/types';
import { getErrorMessageForControl } from 'src/app/shared/functions';

import { setTitle } from '../../store/post-editor.action';
import { selectPost } from '../../store/post-editor.selector';


@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit, OnDestroy {
  titleInputControl = new FormControl(
    '',
    [Validators.required, Validators.minLength(6), Validators.maxLength(50)],
  );

  post$ = this.store.select(selectPost);
  getErrorMessages = getErrorMessageForControl;

  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.reactToInputControlChanges();
    this.setInitialValue();
  }

  private reactToInputControlChanges(): void {
    this.titleInputControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      skip(1), // Skip during hydration -- todo - test if this holds in creation
      map((value) => value ?? ''),
      debounceTime(300),
      distinctUntilChanged(),
      tap((title) => this.store.dispatch(setTitle({ title }))),
    ).subscribe();
  }

  private setInitialValue(): void {
    this.post$.pipe(
      filter((post: Post) => !!post.id),
      take(1),
      tap((post: Post) => {
        this.titleInputControl.setValue(post.title);
        this.titleInputControl.markAsPristine();
      }),
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
