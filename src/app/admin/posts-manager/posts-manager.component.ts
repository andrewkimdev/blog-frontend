import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Post } from 'src/app/shared/types';

import { deletePostByIdFromServer, loadPostsFromServer } from './store/posts-manager.actions';
import * as PostsManagerSelector from './store/posts-manager.selectors';

@Component({
  selector: 'app-posts-manager',
  templateUrl: './posts-manager.component.html',
  styleUrls: ['./posts-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsManagerComponent implements OnInit {
  posts$: Observable<Post[]> = this.store.select(PostsManagerSelector.selectPosts).pipe(
    filter((posts) => posts.length > 0),
    map((posts) => posts as Post[]),
  );

  displayedColumns: string[] = ['id', 'category', 'createdAt', 'title', 'author', 'isDraft', 'action'];

  constructor(private store: Store){
  }

  onDeleteClicked(event: MouseEvent, postId: number) {
    event.stopPropagation();
    console.log(postId);
    const res = confirm("Really delete post?");
    if (res) {
      this.store.dispatch(deletePostByIdFromServer({ id: postId }));
    }
  }

  onRowClicked(post: Post) {
    console.log(post);
    // todo - show post content in a dialog
  }

  ngOnInit(): void {
    this.store.dispatch(loadPostsFromServer());
  }
}
