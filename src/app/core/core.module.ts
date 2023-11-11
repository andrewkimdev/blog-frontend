import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { NgxMarkdownModule } from 'src/app/shared/lib';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TopAlertComponent } from './top-alert/top-alert.component';

@NgModule({
  declarations: [
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
    PageNotFoundComponent,
    TopAlertComponent,
  ],
})
export class CoreModule {
}
