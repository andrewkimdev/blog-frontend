// Angular Core Modules
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
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

@Component({
  selector: 'app-single-post-home-editor',
  templateUrl: './post-editor-home.component.html',
  styleUrls: ['./post-editor-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditorHomeComponent implements OnInit, OnDestroy {
  private addedTextSubject = new BehaviorSubject<string>('');
  addedText$ = this.addedTextSubject.asObservable();

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
    private route: ActivatedRoute,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.hydrateCurrentPost();
  }

  private hydrateCurrentPost(): void {
    this.store.dispatch(PostEditorActions.hydratePostByPostId({ id: this.getCurrentPostId() }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(PostEditorActions.clearPost());
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getCurrentAuthorId(): number {
    return getRandomNumberBetween(1, 8)
  }

  getCurrentPostId(): number {
    return +this.route.snapshot.params['id'];
  }
}
