import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupHomeComponent } from './signup-home/signup-home.component';



@NgModule({
  declarations: [
    SignupHomeComponent,
  ],
  imports: [
    CommonModule,
    SignupRoutingModule
  ]
})
export class SignupModule { }
