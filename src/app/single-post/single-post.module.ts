import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MarkdownModule } from 'ngx-markdown';
import { CoreModule } from '../core/core.module';

import { PostComponent } from './post/post.component';
import { singlePostViewerReducer } from './store/post.reducer';
import { PostViewerEffects } from './store/post.effect';
import { SinglePostRoutingModule } from './single-post-routing.module';



@NgModule({
  declarations: [
    PostComponent,
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
