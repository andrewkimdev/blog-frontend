import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable, skip,
  startWith,
  Subject,
  takeUntil,
  tap
} from 'rxjs';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Category } from 'src/app/shared/types';

import { selectAvailableCategories } from '../store/categories.selectors';
import * as CategoriesActions from '../store/categories.action';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit, OnChanges, OnDestroy {
  categoryInputControl: FormControl<string | null> = new FormControl(
    '', [Validators.required, Validators.minLength(3)]
  );

  @Output('category')
  categoryEmitter = new EventEmitter<Category>();

  readonly _initialCategoryName = 'n/a';
  @Input('initCategory')
  initialCategory: Category = { name: this._initialCategoryName };
  private initDone = false;

  private availableCategoryNames$: Observable<string[]> = this.store.select(selectAvailableCategories).pipe(
    filter(({ categories }) => categories.length > 0),
    map(({ categories }) => categories.map(({ name }) => name)),
  );

  filteredOptions$: Observable<string[]> = combineLatest([
    this.categoryInputControl.valueChanges,
    this.availableCategoryNames$,
  ]).pipe(
    map(([value, list]) => {
      const filterValue = value?.toLowerCase() ?? '';
      return list.filter((item) => item.toLowerCase().includes(filterValue));
    }),
  );

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('initialCategory' in changes) {
      this.setFirstCategoryValue(changes['initialCategory'])
    }
  }

  ngOnInit(): void {
    this.store.dispatch(CategoriesActions.fetchCategories());
    this.reactToInputControlChanges();
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

  private setFirstCategoryValue(initInput: SimpleChange): void {
    if (!this.initDone && initInput?.currentValue.name !== this._initialCategoryName) {
      this.categoryInputControl.setValue(initInput.currentValue.name);
      this.initDone = true;
    }
  }

  private reactToInputControlChanges(): void {
    this.categoryInputControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      skip(1), // For hydration
      startWith(''),
      map((data) => data ?? ''),
      filter((data) => !!data),
      debounceTime(300),
      distinctUntilChanged(),
      tap((name: string) => this.categoryEmitter.emit({ name }))
    ).subscribe();
  }
}
