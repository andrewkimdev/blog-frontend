import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ClarityModule,
  ClrCheckboxModule,
  ClrCommonFormsModule,
  ClrIconModule,
  ClrInputModule,
  ClrTextareaModule
} from '@clr/angular';
import { MarkdownModule } from 'ngx-markdown';

import { MarkdownEditorComponent } from '../core/markdown-editor/markdown-editor.component';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityModule,
    MarkdownModule,
    ClrCommonFormsModule,
    ClrTextareaModule,
    ClrInputModule,
    ClrCheckboxModule,
    ClrIconModule,
  ],
  exports: [
    ClarityModule,
    MarkdownEditorComponent,
    ErrorMessageComponent,
  ],
  declarations: [
    MarkdownEditorComponent,
    ErrorMessageComponent
  ],
})
export class CoreModule { }
