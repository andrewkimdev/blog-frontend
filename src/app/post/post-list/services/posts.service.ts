import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post, User } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(
    private http: HttpClient,
  ) {}

  getAll(): Observable<Post[]> {
    const posts$: Observable<Post[]> = this.http.get<Post[]>(`${ environment.baseUrl }/posts`);
    const users$: Observable<User[]> = this.http.get<User[]>(`${ environment.baseUrl }/users`);

    return combineLatest([posts$, users$]).pipe(
      take(1),
      map(([posts, users]) => {
        const res: Post[] = posts.map((p: Post) => {
          const author: User | undefined = users.find((u: User) => u.id === p.authorId);
          if (author) {
            p.author = {
              ...author, socialMedia: author.socialMedia
            };
          }
          return p;
        });
        return res.length > 0 ? res : [] as Post[];
      }),
    );
  }
}
