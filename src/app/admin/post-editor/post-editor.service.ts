// Angular Core Modules
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Custom Data Types
import { Post } from 'src/app/shared/types';

// Environment Variables
import { environment } from 'src/environments/environment';
import { PostsService } from '../../posts/services/posts.service';

@Injectable({
  providedIn: 'root'
})
export class PostEditorService {
  constructor(
    private http: HttpClient,
    private postService: PostsService,
  ){}

  createNewPost(post: Post) {
    return this.http.post<any>(`${environment.baseUrl}/posts`, post);
  }

  updatePost(post: Post) {
    return this.http.put<any>(`${environment.baseUrl}/posts/${post.id}`, post).pipe(
      take(1),
      tap((res) => console.log(res)),
    ).subscribe();
  }

  createBlankPost(postId: number, authorId: number): Post {
    const post = this.postService.createBlankPost();
    post.id = postId;
    post.authorId = authorId;

    return post;
  }
}
