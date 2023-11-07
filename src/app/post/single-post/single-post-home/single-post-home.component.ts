import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Post } from 'src/app/shared/types';

import { selectSinglePost } from 'src/app/post/single-post/store/post.selector';
import { environment } from 'src/environments/environment';
import * as PostAction from '../store/post.action';

@Component({
  selector: 'app-single-post-home',
  templateUrl: './single-post-home.component.html',
  styleUrls: ['./single-post-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePostHome implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    const id = this.getPostId();
    this.store.dispatch(PostAction.loadPostByIdFromCache({ id }));
  }

  post$: Observable<Post> = this.store.select(selectSinglePost);

  private getPostId(): number {
    return +this.route.snapshot.params['id'];
  }

  editPost(): void {
    const id = this.getPostId();
    this.store.dispatch(PostAction.moveToEditorRoute({ id }));
  }

  getImageUrl(str: string | null): string {
    if (!str) {
      // todo - return a generic main message for the category or other key words.
      return ''
    }

    if (str.includes('assets')) {
      return str;
    } else {
      return `${environment.baseUrl}/images/${str}`;
    }
  }
}
