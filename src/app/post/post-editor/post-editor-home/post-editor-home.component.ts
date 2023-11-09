// Angular Core Modules
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  Subject,
  take,
  tap
} from 'rxjs';

import { ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// Application Services and Functions
import { getRandomNumberBetween } from 'src/app/shared/functions';

// State Management
import { Store } from '@ngrx/store';
import { selectPost } from '../store/post-editor.selector';
import * as PostEditorActions from '../store/post-editor.action';

// Custom Data Definitions
import { Category } from 'src/app/shared/types';

@Component({
  selector: 'app-single-post-home-editor',
  templateUrl: './post-editor-home.component.html',
  styleUrls: ['./post-editor-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditorHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  markdownData$: Observable<string | null> = this.store.select(selectPost).pipe(
    map((p) => p.body),
  );

  private addedTextSubject = new BehaviorSubject<string>('');
  addedText$ = this.addedTextSubject.asObservable();
  private controlValidationErrorsSubject = new BehaviorSubject<ValidationErrors | null>(null);

  controlHasErrors$ = this.controlValidationErrorsSubject.asObservable().pipe(
    map((error) => !!error),
    distinctUntilChanged(),
    tap((res) => console.log('error: ' + res))
  );
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
  }

  onCategorySelected(category: Category) {
    this.store.dispatch(PostEditorActions.setCategory({ name: category.name }))
  }

  initialCategoryName: Category = { name: 'n/a' };

  private setInitialCategoryValue() {
    this.store.select(selectPost).pipe(
      map((p) => p.category),
      filter((c) => !!c && !!c.name),
      take(1),
      map(( c) => c?.name ?? 'n/a'),
      tap((name) => this.initialCategoryName = { name }),
    ).subscribe()
  }

  onFileLinkUpdated(link: string) {
    this.addedTextSubject.next(link);
  }

  ngOnInit(): void {
    this.hydrateCurrentPost();
    this.setInitialCategoryValue();
  }

  ngOnDestroy(): void {
    this.store.dispatch(PostEditorActions.clearPost());
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCurrentPostId(): number {
    return +this.route.snapshot.params['id'];
  }

  private hydrateCurrentPost(): void {
    this.store.dispatch(PostEditorActions.hydratePostByPostId({ id: this.getCurrentPostId() }));
  }

  private getCurrentAuthorId(): number {
    return getRandomNumberBetween(1, 8)
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.store.dispatch(PostEditorActions.markPostAsPristine());
    }, 100)
  }
}
