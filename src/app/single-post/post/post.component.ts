import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Post } from 'src/app/shared/types';

import { selectSinglePost } from 'src/app/single-post/store/post.selector';
import { environment } from 'src/environments/environment';
import * as PostAction from '../store/post.action';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit(): void {
    const id = this.getPostId();
    this.store.dispatch(PostAction.loadPostByIdFromCache({ id }));
  }

  post$: Observable<Post> = this.store.select(selectSinglePost);
  private getPostId(): number {
    return +this.route.snapshot.params['id'];
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
