import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { RouterLink } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TopAlertComponent } from './top-alert/top-alert.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    RouterLink,
  ],
  exports: [
    ClarityModule,
    TopAlertComponent,
  ],
  declarations: [
    PageNotFoundComponent,
    TopAlertComponent,
  ],
})
export class CoreModule { }
