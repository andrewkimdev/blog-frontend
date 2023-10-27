import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ClarityDesignSystemModule, NgxMarkdownModule } from '../lib';

import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TopAlertComponent } from './top-alert/top-alert.component';

@NgModule({
  declarations: [
    ErrorMessageComponent,
    MarkdownEditorComponent,
    PageNotFoundComponent,
    TopAlertComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityDesignSystemModule,
    NgxMarkdownModule,
  ],
  exports: [
    ErrorMessageComponent,
    MarkdownEditorComponent,
    PageNotFoundComponent,
    TopAlertComponent,
  ],
})
export class CoreModule { }
