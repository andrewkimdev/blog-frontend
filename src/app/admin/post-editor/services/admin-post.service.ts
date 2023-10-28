import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/shared/types';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPostService {
  constructor(
    private http: HttpClient,
  ){}

  createOne(post: Post) {
    return this.http.post<any>(`${environment.baseUrl}`, post);
  }
}
