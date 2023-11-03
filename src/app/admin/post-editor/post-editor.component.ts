// Angular Core Modules
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, Subject, take, tap } from 'rxjs';

import { ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// 3rd Party Vendor Modules
import { Store } from '@ngrx/store';

// Application Services and Functions
import { PostEditorService } from './post-editor.service';
import { CategoryService } from './categories/category.service';
import { getCurrentUnixTimeInSeconds, getRandomNumberBetween } from 'src/app/shared/functions';

// Application Data Type Definitions
import { Post, Category } from 'src/app/shared/types';

// State Management
import { selectPostEditor } from './store/post-editor.selector';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditorComponent implements OnInit, OnDestroy {
  private postSubject: BehaviorSubject<Post> = new BehaviorSubject<Post>(this.getBlankPost());
  post$: Observable<Post> = this.postSubject.asObservable();

  private addedTextSubject = new BehaviorSubject<string>('');
  addedText$ = this.addedTextSubject.asObservable();

  categories$: Observable<Category[]> = this.categoryService.categories$;

  markdownData$: Observable<string | null> = this.post$.pipe(
    map((p) => p.body),
  );

  private isPostPristineSubject = new BehaviorSubject<boolean>(false);
  isPostDirty$: Observable<boolean> = this.isPostPristineSubject.asObservable().pipe(
    map((value) => !value),
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
    private postEditorService: PostEditorService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.refreshCategories();
    this.initNewPost();
    this.store.select(selectPostEditor).subscribe(
      res => console.dir(res)
    );
  }

  onSaveClicked() {
    this.markPostAsPristine();
    const updatedAt = getCurrentUnixTimeInSeconds();
    const post = { ...this.duplicatePost(), updatedAt };
    console.log('Saving post... ');
    console.dir(post);
    this.postEditorService.updatePost(this.postSubject.value);
  }

  private duplicatePost(): Post {
    const post = this.postSubject.value;
    return { ...post, tags: [...post.tags], imageIdList: [...post.imageIdList]};
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getBlankPost(): Post {
    const postId = this.getCurrentPostId();
    const authorId = this.getCurrentAuthorId();
    return this.postEditorService.createBlankPost(postId, authorId);
  }

  private markPostAsPristine(): void {
    this.isPostPristineSubject.next(true);
  }

  private markPostAsDirty(): void {
    this.isPostPristineSubject.next(false);
  }

  private refreshCategories(): void {
    this.categoryService.refreshList();
  }

  private initNewPost(): void {
    // 1. Create a sensible blank post with post id and author id
    const post = this.getBlankPost();
    // 2. Update post state
    this.postSubject.next(post);
    // 3. Mark the post as pristine
    this.markPostAsPristine();

    // 4. Let the server know a post has been created.
    this.postEditorService.createNewPost(post).pipe(
      take(1),
    ).subscribe();
  }

  private getCurrentAuthorId(): number {
    return getRandomNumberBetween(1, 8)
  }

  getCurrentPostId(): number {
    return this.route.snapshot.params['id'];
  }
}
