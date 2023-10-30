// Angular Core Modules
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Helper Functions
import { getCurrentUnixTimeInSeconds } from 'src/app/shared/functions';

// Custom Data Types
import { Post } from 'src/app/shared/types';

// Environment Variables
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPostService {
  constructor(
    private http: HttpClient,
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

  createBlankPost(postId: number, authorId: number) {
    return {
      id: postId,
      authorId,
      title: '',
      body: '',
      category: '',
      tags: [],
      isDraft: true,
      createdAt: getCurrentUnixTimeInSeconds(),
      updatedAt: undefined,
      mainImage: undefined,
    };
  }
}
