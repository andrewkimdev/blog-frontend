import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { RouterLink } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    RouterLink,
  ],
  exports: [
    ClarityModule,
  ],
  declarations: [
    PageNotFoundComponent,
  ],
})
export class CoreModule { }
