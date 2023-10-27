import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ClarityModule,
  ClrCheckboxModule,
  ClrCommonFormsModule,
  ClrIconModule,
  ClrInputModule,
  ClrTextareaModule,
  ClrVerticalNavModule
} from '@clr/angular';

const modules = [
  ClarityModule,
  ClrCommonFormsModule,
  ClrTextareaModule,
  ClrInputModule,
  ClrCheckboxModule,
  ClrIconModule,
  ClrVerticalNavModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules,
  ],
  exports: [
    ...modules,
  ]
})
export class ClarityDesignSystemModule { }
