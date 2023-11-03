import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, Subject, takeUntil, tap } from 'rxjs';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';

import { Category } from 'src/app/shared/types';
import { selectCategory } from '../store/post-editor.action';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnChanges, OnDestroy {
  @Input('categories')
  availableCategories: Category[] | null = [];

  categoryInputControl: FormControl<string|null> = new FormControl(
    '', [Validators.required, Validators.minLength(4)]
  );

  private availableCategoriesSubject = new BehaviorSubject<Category[]>([]);
  availableCategories$ = this.availableCategoriesSubject.asObservable().pipe(
    map((c) => c.map(({ name }) => name)),
  );

  private destroy$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.categoryInputControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      map((data) => data ?? ''),
      filter((data) => !!data),
      debounceTime(300),
      distinctUntilChanged(),
      tap((category: string) => this.store.dispatch(selectCategory({ category })))
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['availableCategories']) {
      const c = changes['availableCategories'];
      this.availableCategoriesSubject.next(c.currentValue);
    }
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
