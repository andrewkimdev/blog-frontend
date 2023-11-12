import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MaterialModule, NgxMarkdownModule } from 'src/app/shared/lib';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    NotAuthorizedComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMarkdownModule,
    RouterLink,
  ],
  exports: [
    ReactiveFormsModule,
    PageNotFoundComponent,
  ],
})
export class CoreModule {
}
