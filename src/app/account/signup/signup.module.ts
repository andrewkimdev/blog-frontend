import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupHomeComponent } from './signup-home/signup-home.component';

import { MaterialModule } from '../../shared/lib';

import { SignupRoutingModule } from './signup-routing.module';

@NgModule({
  declarations: [
    SignupHomeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SignupRoutingModule,
  ]
})
export class SignupModule { }
