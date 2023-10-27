import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PostsHomeComponent } from './posts-home/posts-home.component';
import { PostComponent } from './widgets/post/post.component';

import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  declarations: [
    PostsHomeComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PostsRoutingModule,
  ],
})
export class PostsModule { }
