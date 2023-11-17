import { Injectable } from '@angular/core';
import { catchError, combineLatest, EMPTY, from, map, Observable, of, take, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Post, User } from 'src/app/shared/types';

import { environment } from 'src/environments/environment';
import { supabase } from '../../../shared/lib';
import { convertKeysToCamelCase } from '../../../shared/functions';

@Injectable({
  providedIn: 'root'
})
export class PostsManagerService {

  constructor(
    private http: HttpClient,
  ) {}

  getAll(): Observable<Post[]> {
    return from(
      supabase.from('posts')
        .select('*')
    ).pipe(
      map(({ data: posts }) => posts && posts.length > 0 ? posts.map((p) => p) : []),
      map((posts) => posts.map((p) => convertKeysToCamelCase<Post>(p))),
      tap((res) => console.log(res)),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  deletePostById(postId: number) {
    return this.http.delete<{ id: number }>(`${environment.baseUrl}/posts/${postId}`).pipe(
      map(() => ({ id: postId })),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    )
  }

  updatePublishedStateById(postId: number, isDraft: boolean): Observable<Post> {
    return this.http.patch<Post>(`${environment.baseUrl}/posts/${postId}`, { isDraft });
  }
}
