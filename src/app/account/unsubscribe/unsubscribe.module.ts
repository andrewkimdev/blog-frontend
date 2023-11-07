import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsubscribeHomeComponent } from './unsubscribe-home/unsubscribe-home.component';
import { UnsubscribeRoutingModule } from './unsubscribe-routing.module';



@NgModule({
  declarations: [
    UnsubscribeHomeComponent
  ],
  imports: [
    CommonModule,
    UnsubscribeRoutingModule,
  ]
})
export class UnsubscribeModule { }
