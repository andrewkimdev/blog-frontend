import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityDesignSystemModule, NgxMarkdownModule } from '../lib';
import { CoreModule } from 'src/app/core/core.module';

import { PostEditorComponent } from './post-editor/post-editor.component';
import { TagsComponent } from './post-editor/tags/tags.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AdminRoutingModule } from './admin-routing.module';
import { TitleComponent } from './post-editor/title/title.component';
import { EditorComponent } from './post-editor/editor/editor.component';
import { ButtonsComponent } from 'src/app/admin/post-editor/buttons/buttons.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PostEditorComponent,
    TagsComponent,
    TitleComponent,
    EditorComponent,
    ButtonsComponent,
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
