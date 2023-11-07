// Angular Core Modules
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Custom Data Types
import { Post } from 'src/app/shared/types';

// Environment Variables
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostEditorService {
  constructor(
    private http: HttpClient,
  ) {
  }

  createNewPost(): Observable<Post> {
    return this.http.post<Post>(`${environment.baseUrl}/posts`, '');
  }

  updatePost(post: Post) {
    return this.http.put<Post>(`${environment.baseUrl}/posts/${post.id}`, post);
  }
}
