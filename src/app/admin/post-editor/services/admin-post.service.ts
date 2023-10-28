import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { PostsService } from 'src/app/posts/services/posts.service';
import { Post } from 'src/app/shared/types';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPostService {
  constructor(
    private http: HttpClient,
    private postsService: PostsService
  ){}

  createOne(post: Post) {
    this.postsService.getNextId().pipe(
      map((id: number): Post => {
        return {
          title: '', body: '', tags: [], isDraft: true, id,
        }
      }),
    );
    return this.http.post<any>(`${environment.baseUrl}/posts`, post);
  }

  createBlankPost() {

  }
}
