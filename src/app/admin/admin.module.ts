import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ClrCheckboxModule,
  ClrCommonFormsModule,
  ClrIconModule,
  ClrInputModule,
  ClrTextareaModule
} from '@clr/angular';
import { MarkdownModule } from 'ngx-markdown';
import { CoreModule } from 'src/app/core/core.module';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MarkdownEditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MarkdownModule,
    ClrCommonFormsModule,
    ClrTextareaModule,
    ClrInputModule,
    ClrCheckboxModule,
    ClrIconModule,
    CoreModule
  ]
})
export class AdminModule { }
