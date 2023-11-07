import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityDesignSystemModule } from '../lib';
import { AccountRoutingModule } from './account-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ClarityDesignSystemModule,
    AccountRoutingModule,
  ]
})
export class AccountModule { }
