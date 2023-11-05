import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
  tap
} from 'rxjs';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Category } from 'src/app/shared/types';
import * as PostEditorActions from '../../store/post-editor.action';
import { selectAvailableCategories } from 'src/app/post/post-editor/store/category.selectors';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categoryInputControl: FormControl<string|null> = new FormControl(
    '', [Validators.required, Validators.minLength(4)]
  );

  private destroy$ = new Subject<void>();

  constructor(private store: Store) {}

  categoryNames: Observable<string[]> = this.store.select(selectAvailableCategories).pipe(
    map((c: Category[]) => c.map(({ name }) => name)),
  );

  ngOnInit(): void {
    this.reactToCategoryChange();
  }

  private reactToCategoryChange(): void {
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
