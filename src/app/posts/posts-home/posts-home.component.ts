import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts-home',
  templateUrl: './posts-home.component.html',
  styleUrls: ['./posts-home.component.scss']
})
export class PostsHomeComponent implements OnInit {
  posts$ = this.postsService.posts$;

  constructor(
    private router: Router,
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.postsService.refreshList();
  }

  showPost(p: any) {
    this.router.navigate(['posts', p.id]);
  }
}
