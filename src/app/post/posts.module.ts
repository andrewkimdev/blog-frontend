import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PostsHomeComponent } from './post-list/posts-home/posts-home.component';

import { PostsRoutingModule } from './posts-routing.module';
import { MarkdownModule } from 'ngx-markdown';
import { MaterialModule } from '../shared/lib';

import { postsReducer } from './post-list/store/posts.reducer';
import { PostsEffects } from './post-list/store/posts.effect';
import { RedirectComponent } from './create-new-post/redirect.component';

@NgModule({
  declarations: [
    PostsHomeComponent,
    RedirectComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgOptimizedImage,
    MarkdownModule,
    MaterialModule,
    PostsRoutingModule,
    StoreModule.forFeature('postsFeatureKey', postsReducer),
    EffectsModule.forFeature([PostsEffects]),
  ],
})
export class PostsModule {
}
