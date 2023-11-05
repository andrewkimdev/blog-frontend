import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MarkdownModule } from 'ngx-markdown';
import { CoreModule } from 'src/app/core/core.module';

import { SinglePostHome } from 'src/app/post/single-post/single-post-home/single-post-home.component';
import { singlePostViewerReducer } from './store/post.reducer';
import { PostViewerEffects } from './store/post.effect';
import { SinglePostRoutingModule } from './single-post-routing.module';



@NgModule({
  declarations: [
    SinglePostHome,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MarkdownModule,
    StoreModule.forFeature('singlePostViewerFeatureKey', singlePostViewerReducer),
    EffectsModule.forFeature([PostViewerEffects]),
    SinglePostRoutingModule,
  ]
})
export class SinglePostModule { }
