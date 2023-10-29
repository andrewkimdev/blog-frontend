import { Injectable } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs';

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

  createNewPost(post: Post) {
    return this.postsService.getNextId().pipe(
      map((id: number): Post => this.createBlankPost(id)),
      map((p) => ({...p, ...post}) as Post),
      switchMap((post) => this.http.post<any>(`${environment.baseUrl}/posts`, post))
    );
  }

  updatePost(post: Post) {
    return this.http.put<any>(`${environment.baseUrl}/posts/${post.id}`, post).pipe(
      take(1),
      tap((res) => console.log(res)),
    ).subscribe();
  }

  createBlankPost(id: number) {
    const createdAt = Math.floor(Date.now() / 1000);
    return {
      title: '', body: '', tags: [], isDraft: true, id, category: '', createdAt
    }
  }
}
