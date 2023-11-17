import { Injectable } from '@angular/core';
import { catchError, EMPTY, from, map, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { supabase } from 'src/app/shared/lib';

import { convertKeysToCamelCase } from 'src/app/shared/functions';

import { Post } from 'src/app/shared/types';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(
    private store: Store,
  ) {
  }

  getAll(): Observable<Post[]> {
    return from(
      supabase.from('posts')
        .select('*')
    ).pipe(
      tap((res) => console.log(res)),
      map(({ data: posts }) => posts && posts.length > 0 ? posts.map((p) => p) : []),
      map((posts) => posts.map((p) => convertKeysToCamelCase<Post>(p))),
      tap((res) => console.log(res)),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }
}
