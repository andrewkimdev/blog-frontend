import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Post } from 'src/app/shared/types';
import * as PostsAction from './../store/posts.action';
import { PostsState } from '../store/posts.reducer';
import { selectPosts } from '../store/posts.selector';

@Component({
  selector: 'app-posts-home',
  templateUrl: './posts-home.component.html',
  styleUrls: ['./posts-home.component.scss']
})
export class PostsHomeComponent implements OnInit {
  posts$: Observable<Post[]> = this.store.pipe(select(selectPosts)).pipe(
    tap((res) => console.log(res)),
  );

  constructor(
    private router: Router,
    private store: Store<PostsState>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(PostsAction.loadPosts());
  }

  showPost(p: any) {
    this.router.navigate(['posts', p.id]).then();
  }
}
