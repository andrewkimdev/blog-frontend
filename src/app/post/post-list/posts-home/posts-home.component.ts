import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';

import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { createImageUrlFromUuid, duplicatePost } from 'src/app/shared/functions';

import { Post } from 'src/app/shared/types';

import { PostsState } from '../store/posts.reducer';
import { selectPosts } from '../store/posts.selector';
import * as PostsAction from './../store/posts.action';

@Component({
  selector: 'app-single-post-home-list-home',
  templateUrl: './posts-home.component.html',
  styleUrls: ['./posts-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsHomeComponent implements OnInit {
  posts$: Observable<Post[]> = this.store.pipe(select(selectPosts)).pipe(
    map((posts: Post[]) =>
      posts.map((post: Post) => this.applySanitizedImageUrl(post))
    ),
  );

  // N.B.: It is ideal to place this in the reducer but DomSanitizer should be run in the DI context.
  // Using 'inject()' produces error when tried.
  private applySanitizedImageUrl(post: Post): Post {
    const _mainImage = post.mainImage?.startsWith('assets')
      ? post.mainImage
      : createImageUrlFromUuid(post.mainImage ?? '', 'html');
    const mainImage = this.sanitizer.bypassSecurityTrustResourceUrl(_mainImage);
    return duplicatePost(post, { mainImage });
  }

  constructor(
    private router: Router,
    private store: Store<PostsState>,
    private sanitizer:  DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(PostsAction.loadPostsFromCache());
  }

  gotoPost(id: number | null) {
    if (id) {
      this.router.navigate(['posts', id]).then();
    }
  }
}
