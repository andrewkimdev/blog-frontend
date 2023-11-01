import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, of, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { getCurrentUnixTimeInSeconds } from '../../shared/functions';

import { Post, User } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnInit {
  private postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  posts$: Observable<Post[]> = this.postsSubject.asObservable();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshList();
  }

  refreshList(): void {
    const posts$: Observable<Post[]> = this.http.get<Post[]>(`${ environment.baseUrl }/posts`);
    const users$: Observable<User[]> = this.http.get<User[]>(`${ environment.baseUrl }/users`);

    combineLatest([posts$, users$]).pipe(
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
      tap((posts) => this.postsSubject.next(posts)),
    ).subscribe();
  }

  createBlankPost(): Post {
    return {
      id: null,
      authorId: null,
      title: '',
      body: '',
      category: '',
      tags: [],
      isDraft: true,
      createdAt: getCurrentUnixTimeInSeconds(),
      updatedAt: undefined,
      mainImage: undefined,
      imageIdList: [],
    } as Post;
  }

  getById(id: number): Observable<Post> {
    const p = this.postsSubject.value.find((post) => post.id === id);
    return p ? of(p) : of({ ...this.createBlankPost() });
  }

  getNextId(): Observable<number> {
    // TODO: Get this info from server
    const ids = this.postsSubject.value.map(p => p.id);
    // @ts-ignore
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    return of(maxId + 1);
  }
}
