import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { OtpSignInComponent } from './otp-sign-in/otp-sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [

    OtpSignInComponent,
       ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
  ]
})
export class AccountModule { }
