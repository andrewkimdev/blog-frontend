import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getOneById(id: number): Observable<Post> {
    return this.http.get<Post>(`${ environment.baseUrl }/posts/${id}`);
  }
}
