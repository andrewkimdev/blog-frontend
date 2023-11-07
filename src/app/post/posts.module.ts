import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ClarityDesignSystemModule } from '../lib';

import { PostsHomeComponent } from './post-list/posts-home/posts-home.component';
import { CreateNewPostComponent } from './create-new-post/create-new-post.component';

import { PostsRoutingModule } from './posts-routing.module';
import { MarkdownModule } from 'ngx-markdown';

import { postsReducer } from './post-list/store/posts.reducer';
import { PostsEffects } from './post-list/store/posts.effect';

@NgModule({
  declarations: [
    PostsHomeComponent,
    CreateNewPostComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PostsRoutingModule,
    NgOptimizedImage,
    ClarityDesignSystemModule,
    MarkdownModule,
    StoreModule.forFeature('postsFeatureKey', postsReducer),
    EffectsModule.forFeature([PostsEffects]),
  ],
})
export class PostsModule {
}
