import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  Subject,
  take,
  takeUntil,
  tap
} from 'rxjs';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';

import { Category, Post } from 'src/app/shared/types';

import { Store } from '@ngrx/store';

import * as PostEditorActions from '../../store/post-editor.action';
import { selectAvailableCategories } from '../../store/category.selectors';
import { selectPost } from '../../store/post-editor.selector';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categoryInputControl: FormControl<string | null> = new FormControl(
    '', [Validators.required, Validators.minLength(4)]
  );

  post$ = this.store.select(selectPost);

  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
  }

  categoryNames: Observable<string[]> = this.store.select(selectAvailableCategories).pipe(
    map((c: Category[]) => c.map(({ name }) => name)),
  );

  ngOnInit(): void {
    this.reactToInputControlChanges();
    this.setInitialValue();
  }

  private setInitialValue(): void {
    this.post$.pipe(
      filter((post: Post) => !!post.id),
      take(1),
      tap((post: Post) => {

        this.categoryInputControl.setValue(post.category?.name ?? '');
      }),
    ).subscribe();
  }

  private reactToInputControlChanges(): void {
    this.categoryInputControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      map((data) => data ?? ''),
      filter((data) => !!data),
      debounceTime(300),
      distinctUntilChanged(),
      tap((category: string) => this.store.dispatch(PostEditorActions.setCategory({ category })))
    ).subscribe();
  }

  inputControlError(): ValidationErrors | null {
    if (this.categoryInputControl.touched && this.categoryInputControl.errors) {
      return this.categoryInputControl.errors || null;
    }
    return null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
