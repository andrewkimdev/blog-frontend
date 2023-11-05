// Angular Core Modules
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, Subject, take, tap } from 'rxjs';

import { ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// 3rd Party Vendor Modules
import { Store } from '@ngrx/store';

// Application Services and Functions
import { CategoryService } from '../widgets/categories/category.service';
import { getRandomNumberBetween } from 'src/app/shared/functions';

// Application Data Type Definitions
import { Category } from 'src/app/shared/types';

// State Management
import { selectPost } from '../store/post-editor.selector';
import * as PostEditorActions from '../store/post-editor.action';

@Component({
  selector: 'app-single-post-home-editor',
  templateUrl: './post-editor-home.component.html',
  styleUrls: ['./post-editor-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditorHomeComponent implements OnInit, OnDestroy {
  private addedTextSubject = new BehaviorSubject<string>('');
  addedText$ = this.addedTextSubject.asObservable();

  categories$: Observable<Category[]> = this.categoryService.categories$;

  markdownData$: Observable<string | null> = this.store.select(selectPost).pipe(
    map((p) => p.body),
  );

  private controlValidationErrorsSubject = new BehaviorSubject<ValidationErrors | null>(null);
  controlHasErrors$ = this.controlValidationErrorsSubject.asObservable().pipe(
    map((error) => !!error),
    distinctUntilChanged(),
    tap((res) => console.log('error: ' + res))
  );

  onFileLinkUpdated(link: string) {
    this.addedTextSubject.next(link);
  }

  private destroy$ = new Subject<void>();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.refreshCategories();
    this.ensurePostId();
  }

  // This is needed when the user has just refreshed page and arrived at single-post-home editor view.
  private ensurePostId() {
    this.store.select(selectPost).pipe(take(1)).subscribe(
      post => {
        if (!post.id) {
          this.store.dispatch(PostEditorActions.setPostId({ id: this.getCurrentPostId() }));
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(PostEditorActions.clearPost());
    this.destroy$.next();
    this.destroy$.complete();
  }

  private refreshCategories(): void {
    this.categoryService.refreshList();
  }

  private getCurrentAuthorId(): number {
    return getRandomNumberBetween(1, 8)
  }

  getCurrentPostId(): number {
    return +this.route.snapshot.params['id'];
  }
}
