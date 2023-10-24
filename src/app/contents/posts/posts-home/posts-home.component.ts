import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../widgets/post/post.component';

@Component({
  selector: 'app-posts-home',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './posts-home.component.html',
  styleUrls: ['./posts-home.component.scss']
})
export class PostsHomeComponent {

}
