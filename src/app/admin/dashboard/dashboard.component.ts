import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { PostsService } from 'src/app/posts/services/posts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private postService: PostsService,
  ) {}

  ngOnInit(): void {
  }

  createPost() {
    this.postService.getNextId().pipe(
      take(1),
      tap((id) => this.router.navigate(['admin', 'posts', id, 'edit'])),
    ).subscribe();
  }
}

