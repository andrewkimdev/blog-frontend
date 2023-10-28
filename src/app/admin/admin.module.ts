import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityDesignSystemModule, NgxMarkdownModule } from '../lib';
import { CoreModule } from 'src/app/core/core.module';


import { MarkdownEditorComponent } from './post-editor/markdown-editor/markdown-editor.component';
import { TagsComponent } from './post-editor/tags/tags.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    MarkdownEditorComponent,
    TagsComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    NgxMarkdownModule,
    ClarityDesignSystemModule,

    AdminRoutingModule,
  ]
})
export class AdminModule { }
