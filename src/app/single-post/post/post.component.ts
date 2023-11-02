import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PostAction from '../store/post.action';

import { Post } from 'src/app/shared/types';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private store: Store<{ posts: Post[], id: number }>,
  ) {}

  ngOnInit(): void {
    const id = this.getPostId();
    this.store.dispatch(PostAction.loadPostById({ id }));
  }

  post$: Observable<Post> = this.store.select(({ posts, id}) => posts[id]);
  private getPostId(): number {
    return +this.route.snapshot.params['id'];
  }
}
