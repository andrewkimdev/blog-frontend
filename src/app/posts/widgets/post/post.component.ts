import { Component } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
  ) {}

  post$: Observable<any> = this.route.params.pipe(
    map(({ id }) => +id),
    switchMap((id) => this.postsService.getById(id)),
    tap((res) => console.log(res)),
  );

  postBody$ = this.post$.pipe(
    map(({ body }) => body),
  )
}
