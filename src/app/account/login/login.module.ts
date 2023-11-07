// Angular Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Library
import { ClarityDesignSystemModule } from 'src/app/lib';

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
    ClarityDesignSystemModule,
    LoginRoutingModule,
  ]
})
export class LoginModule { }
