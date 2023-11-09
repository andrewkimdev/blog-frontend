import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';

import { NgxMarkdownModule } from 'src/app/shared/lib';

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
    MatChipsModule,
    MatInputModule,
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
