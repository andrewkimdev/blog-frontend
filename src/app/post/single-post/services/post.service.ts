import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Post } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  getOneById(id: number): Observable<Post> {
    return this.http.get<Post>(`${environment.baseUrl}/posts/${id}`);
  }

  moveToEditorRoute(id: number): void {
    this.router.navigate(['posts', id, 'edit']);
  }
}
