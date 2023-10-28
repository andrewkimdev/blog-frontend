import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnInit {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$: Observable<Post[]> = this.postsSubject.asObservable();

  constructor(
    private http: HttpClient,
  ){}

  ngOnInit() {
    this.refreshList();
  }

  refreshList(): void {
    this.http.get<any[]>(environment.baseUrl).subscribe(data => {
      this.postsSubject.next(data);
    });
  }

  getById(id: number) {
    return this.http.get<any>(`${environment.baseUrl}/${id}`);
  }
}
