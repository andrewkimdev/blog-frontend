// Angular Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Library

// Module Components
import { LoginHomeComponent } from './login-home/login-home.component';

// Routing Module
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [
    LoginHomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
  ]
})
export class LoginModule { }
