import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ClarityDesignSystemModule } from '../lib';

import { PostsHomeComponent } from './posts-home/posts-home.component';
import { PostComponent } from './widgets/post/post.component';

import { PostsRoutingModule } from './posts-routing.module';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    PostsHomeComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PostsRoutingModule,
    NgOptimizedImage,
    ClarityDesignSystemModule,
    MarkdownModule,
  ],
})
export class PostsModule { }
