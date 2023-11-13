import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
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

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ){
  }

  form = this.fb.group({
    isDraftStates: this.fb.array([])
  });

  get isDraftStates() {
    return this.form.get('isDraftStates') as FormArray;
  }

  onDeleteClicked(event: MouseEvent, postId: number) {
    event.stopPropagation();
    console.log(postId);
    const res = confirm("Really delete post?");
    if (res) {
      this.store.dispatch(deletePostByIdFromServer({ id: postId }));
    }
  }

  onRowClicked(postId: number) {
    window.open('/posts/' + postId, '_blank');
  }

  ngOnInit(): void {
    this.store.dispatch(loadPostsFromServer());
    this.posts$.subscribe((posts) => {
      while(this.isDraftStates.length !== 0) {
        this.isDraftStates.removeAt(0);
      }

      posts.forEach((post) => {
        this.isDraftStates.push(this.fb.control(post.isDraft))
      });
    });

    this.form.valueChanges.subscribe(
      (value) => {
        console.log(value)
      }
    )
  }
}
