import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnInit {
  private postsSubject = new BehaviorSubject<any[]>([]);
  posts$ = this.postsSubject.asObservable();

  constructor(
    private http: HttpClient,
  ){}

  ngOnInit() {
    this.refreshList();
  }

  refreshList(): void {
    this.http.get<any[]>('api/posts').subscribe(data => {
      this.postsSubject.next(data);
    });
  }

  getById(id: number) {
    return this.http.get<any>(`api/posts/${id}`);
  }
}
