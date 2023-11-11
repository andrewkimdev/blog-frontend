// Angular Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

// Library
import { MaterialModule } from 'src/app/shared/lib';

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
    MaterialModule,
    LoginRoutingModule,
    CoreModule,
  ]
})
export class LoginModule { }
