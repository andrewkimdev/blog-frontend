import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { NgxMarkdownModule } from '../lib';

import { ErrorMessageComponent } from './error-message/error-message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TopAlertComponent } from './top-alert/top-alert.component';

@NgModule({
  declarations: [
    ErrorMessageComponent,
    PageNotFoundComponent,
    TopAlertComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMarkdownModule,
    RouterLink,
  ],
  exports: [
    ReactiveFormsModule,
    ErrorMessageComponent,
    PageNotFoundComponent,
    TopAlertComponent,
  ],
})
export class CoreModule {
}
