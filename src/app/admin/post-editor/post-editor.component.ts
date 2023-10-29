import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, map, Observable, Subject, take, tap } from 'rxjs';

import { AdminPostService } from 'src/app/admin/post-editor/services/admin-post.service';
import { CategoryService } from 'src/app/admin/post-editor/services/category.service';

import { Post, Category } from 'src/app/shared/types';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditorComponent implements OnInit, OnDestroy {
  private postSubject: BehaviorSubject<Post> = new BehaviorSubject<Post>({ title: '', body: '', tags: [], isDraft: false, category: '' });
  post$: Observable<Post> = this.postSubject.asObservable();

  categories$ : Observable<Category[]> = this.categoryService.categories$;

  markdownData$: Observable<string | null> = this.post$.pipe(
    map((p) => p.body),
  );

  private isPostPristineSubject = new BehaviorSubject<boolean>(false);
  isPostDirty$: Observable<boolean> = this.isPostPristineSubject.asObservable().pipe(
    map((value) => !value),
  );

  private controlValidationErrorsSubject = new BehaviorSubject<ValidationErrors|null>(null);
  controlHasErrors$ = this.controlValidationErrorsSubject.asObservable().pipe(
    map((error) => !!error),
    distinctUntilChanged(),
    tap((res) => console.log('error: ' + res))
  );

  private destroy$ = new Subject<void>();

  constructor(
    private adminPostService: AdminPostService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
  ) {}

  private setPostPristine(): void {
    this.isPostPristineSubject.next(true);
  }

  private setPostDirty(): void {
    this.isPostPristineSubject.next(false);
  }

  ngOnInit(): void {
    this.refreshCategories();
    this.initNewPost();
  }

  private refreshCategories(): void {
    this.categoryService.refreshList();
  }

  setDraft(isDraft: boolean) {
    const post: Post = { ...this.postSubject.value, tags: [...this.postSubject.value.tags], isDraft };
    this.postSubject.next(post);
    this.setPostDirty();
  }

  onBodyUpdated(body: string) {
    const post: Post = { ...this.postSubject.value, tags: [...this.postSubject.value.tags], body };
    this.postSubject.next(post);
    this.setPostDirty();
  }

  onCategorySelected(category: Category) {
    const post: Post = { ...this.postSubject.value, tags: [...this.postSubject.value.tags], category: category.name };
    this.postSubject.next(post);
    this.setPostDirty();
  }

  onTitleUpdated(title: string): void {
    const post: Post = { ...this.postSubject.value, tags: [...this.postSubject.value.tags], title };
    this.postSubject.next(post);
    this.setPostDirty();
  }

  onTagsUpdated(tags: string[]): void {
    const post: Post = { ...this.postSubject.value, tags: [...tags] };
    this.postSubject.next(post);
    this.setPostDirty();
  }

  onSaveClicked() {
    this.setPostPristine();
    const updatedAt = Math.floor(Date.now() / 1000);
    const post = { ...this.postSubject.value, tags: [...this.postSubject.value.tags], updatedAt };
    console.log('Saving post... ');
    console.dir(post);
    this.adminPostService.updatePost(this.postSubject.value);
  }


  onCancelClicked(): void {
    console.log('cancel clicked');
  }

  private setId(): void {
    const id = this.getCurrentPostId();
    const post: Post = { ...this.postSubject.value, tags: [...this.postSubject.value.tags], id };
    this.postSubject.next(post);
  }

  private initNewPost(): void {
    const authorId: number = this.getCurrentAuthorId();
    this.setId();

    this.adminPostService.createNewPost({...this.postSubject.value, authorId }).pipe(
      take(1),
      tap(() => this.setPostPristine()),
    ).subscribe();
  }

  private getCurrentAuthorId(): number {
    const getRandomNumber = (upperBound: number) => Math.floor(Math.random() * upperBound) + 1;
    return getRandomNumber(7);
  }

  private getCurrentPostId(): number {
    return this.route.snapshot.params['id'];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
