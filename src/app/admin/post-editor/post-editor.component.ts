import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, map, Observable, Subject, take, tap } from 'rxjs';

import { AdminPostService } from 'src/app/admin/post-editor/services/admin-post.service';
import { CategoryService } from 'src/app/admin/post-editor/services/category.service';

import { getCurrentUnixTimeInSeconds, getRandomNumberBetween } from 'src/app/shared/functions';
import { Post, Category } from 'src/app/shared/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditorComponent implements OnInit, OnDestroy {
  private postSubject: BehaviorSubject<Post> = new BehaviorSubject<Post>(this.getBlankPost());
  post$: Observable<Post> = this.postSubject.asObservable();

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

  selectedFile!: File;

  private destroy$ = new Subject<void>();

  constructor(
    private adminPostService: AdminPostService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private http: HttpClient, // For File Upload Testing Only... Delegate to Service after testing.
  ) {
  }

  ngOnInit(): void {
    this.refreshCategories();
    this.initNewPost();
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  upUploadButtonClicked() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    const postId = this.getCurrentPostId();
    this.http.post(environment.baseUrl + '/posts/' + postId + '/image', fd)
      .subscribe((res) => {
        console.log(res);
      });
  }

  setDraft(isDraft: boolean) {
    const post: Post = { ...this.duplicatePost(), isDraft };
    this.postSubject.next(post);
    this.markPostAsDirty();
  }

  onBodyUpdated(body: string) {
    const post: Post = { ...this.duplicatePost(), body };
    this.postSubject.next(post);
    this.markPostAsDirty();
  }

  onCategorySelected(category: Category) {
    const post: Post = { ...this.duplicatePost(), category: category.name };
    this.postSubject.next(post);
    this.markPostAsDirty();
  }

  onTitleUpdated(title: string): void {
    const post: Post = { ...this.duplicatePost(), title };
    this.postSubject.next(post);
    this.markPostAsDirty();
  }

  onTagsUpdated(tags: string[]): void {
    const post: Post = { ...this.duplicatePost(), tags: [...tags] };
    this.postSubject.next(post);
    this.markPostAsDirty();
  }

  onSaveClicked() {
    this.markPostAsPristine();
    const updatedAt = getCurrentUnixTimeInSeconds();
    const post = { ...this.duplicatePost(), updatedAt };
    console.log('Saving post... ');
    console.dir(post);
    this.adminPostService.updatePost(this.postSubject.value);
  }

  private duplicatePost(): Post {
    return { ...this.postSubject.value, tags: [...this.postSubject.value.tags]};
  }

  onCancelClicked(): void {
    console.log('cancel clicked');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getBlankPost(): Post {
    const postId = this.getCurrentPostId();
    const authorId = this.getCurrentAuthorId();
    return this.adminPostService.createBlankPost(postId, authorId);
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
    this.adminPostService.createNewPost(post).pipe(
      take(1),
    ).subscribe();
  }

  private getCurrentAuthorId(): number {
    return getRandomNumberBetween(1, 8)
  }

  private getCurrentPostId(): number {
    return this.route.snapshot.params['id'];
  }
}
