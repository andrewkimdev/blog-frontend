import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectSinglePost } from 'src/app/single-post/store/post.selector';
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
    this.store.dispatch(PostAction.loadPostByIdFromCache({ id }));
  }

  post$: Observable<Post> = this.store.select(selectSinglePost);
  private getPostId(): number {
    return +this.route.snapshot.params['id'];
  }
}
