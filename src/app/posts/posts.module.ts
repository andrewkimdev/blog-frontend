import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsHomeComponent } from 'src/app/posts/posts-home/posts-home.component';
import { PostComponent } from 'src/app/posts/widgets/post/post.component';

import { PostsRoutingModule } from './posts-routing.module';


@NgModule({
  declarations: [
    PostsHomeComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
  ],
})
export class PostsModule { }
