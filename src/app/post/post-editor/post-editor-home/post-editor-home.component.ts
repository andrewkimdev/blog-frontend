// Angular Core Modules
import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
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

// 3rd Party Vendor Modules
import { MatSnackBar } from '@angular/material/snack-bar';

// Application Services and Functions
import { getRandomNumberBetween } from 'src/app/shared/functions';

// State Management
import { Store } from '@ngrx/store';
import { selectIsDirty, selectPost } from '../store/post-editor.selector';
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
  initialCategoryName: Category = { name: 'n/a' };
  private addedTextSubject = new BehaviorSubject<string>('');
  addedText$ = this.addedTextSubject.asObservable();
  private controlValidationErrorsSubject = new BehaviorSubject<ValidationErrors | null>(null);
  controlHasErrors$ = this.controlValidationErrorsSubject.asObservable().pipe(
    map((error) => !!error),
    distinctUntilChanged(),
    tap((res) => console.log('error: ' + res))
  );
  private destroy$ = new Subject<void>();

  isDirty$ = this.store.select(selectIsDirty);

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private _snackBar: MatSnackBar,
  ) {
  }

  @HostListener('window:keydown', ['$event'])
  handleEditorKeydown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      this.savePost();
    }
  }

  private savePost() {
    this.isDirty$.pipe(
      take(1),
      filter((isDirty) => isDirty),
      tap(() => {
        this.store.dispatch(PostEditorActions.savePost());
        const message = 'Post saved!'
        const action = 'OK';
        this._snackBar.open(message, action, { duration: 3000 });
      }),
    ).subscribe();
  }

  onCategorySelected(category: Category) {
    this.store.dispatch(PostEditorActions.setCategory({ name: category.name }))
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.store.dispatch(PostEditorActions.markPostAsPristine());
    }, 0);
  }

  private setInitialCategoryValue() {
    this.store.select(selectPost).pipe(
      map((p) => p.category),
      filter((c) => !!c && !!c.name),
      take(1),
      map((c) => c?.name ?? 'n/a'),
      tap((name) => this.initialCategoryName = { name }),
    ).subscribe()
  }

  private hydrateCurrentPost(): void {
    this.store.dispatch(PostEditorActions.hydratePostByPostId({ id: this.getCurrentPostId() }));
  }

  private getCurrentAuthorId(): number {
    return getRandomNumberBetween(1, 8)
  }
}
