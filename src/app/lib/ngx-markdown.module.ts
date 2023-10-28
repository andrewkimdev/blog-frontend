import { CommonModule } from '@angular/common';
import { NgModule, SecurityContext } from '@angular/core';

import { ClipboardButtonComponent, ClipboardOptions, MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
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
