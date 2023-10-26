import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
  ],
  exports: [
    ClarityModule,
    ErrorMessageComponent,
  ],
  declarations: [
    ErrorMessageComponent
  ],
})
export class CoreModule { }
