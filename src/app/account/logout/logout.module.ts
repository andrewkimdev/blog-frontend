import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutRoutingModule } from './logout-routing.module';
import { LogoutHomeComponent } from './logout-home/logout-home.component';



@NgModule({
  declarations: [
    LogoutHomeComponent
  ],
  imports: [
    CommonModule,
    LogoutRoutingModule,
  ]
})
export class LogoutModule { }
