import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ClarityDesignSystemModule } from '../lib';

import { PostsHomeComponent } from './posts-home/posts-home.component';

import { PostsRoutingModule } from './posts-routing.module';
import { MarkdownModule } from 'ngx-markdown';

import { postsReducer } from './store/posts.reducer';
import { PostsEffects } from './store/posts.effect';

@NgModule({
  declarations: [
    PostsHomeComponent,
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
export class PostsModule { }
