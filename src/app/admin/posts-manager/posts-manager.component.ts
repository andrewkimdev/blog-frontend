import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';

import { Post } from 'src/app/shared/types';

import { loadPostsFromServer } from './store/posts-manager.actions';
import * as PostsManagerSelector from './store/posts-manager.selectors';

@Component({
  selector: 'app-posts-manager',
  templateUrl: './posts-manager.component.html',
  styleUrls: ['./posts-manager.component.scss']
})
export class PostsManagerComponent {
  posts$: Observable<Post[]> = this.store.select(PostsManagerSelector.selectPosts).pipe(
    filter((posts) => !posts.length),
  );

  constructor(private store: Store){
  }

  ngOnInit(): void {
    this.store.dispatch(loadPostsFromServer());
  }
}
