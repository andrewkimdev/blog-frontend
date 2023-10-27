import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClipboardButtonComponent, ClipboardOptions, MarkdownModule } from 'ngx-markdown';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MarkdownModule.forRoot({
      clipboardOptions: {
        provide: ClipboardOptions,
        useValue: {
          buttonComponent: ClipboardButtonComponent,
        }
      }
    }),
  ],
  exports: [
    MarkdownModule,
  ]
})
export class NgxMarkdownModule { }
