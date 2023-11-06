import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/core/core.module';
import { MarkdownModule } from 'ngx-markdown';

import { SinglePostHome } from 'src/app/post/single-post/single-post-home/single-post-home.component';
import { SinglePostRoutingModule } from './single-post-routing.module';

@NgModule({
  declarations: [
    SinglePostHome,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MarkdownModule,
    SinglePostRoutingModule,
  ]
})
export class SinglePostModule { }
