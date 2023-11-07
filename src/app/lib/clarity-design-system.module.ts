import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ClarityModule,
  ClrButtonModule,
  ClrCheckboxModule,
  ClrCommonFormsModule,
  ClrIconModule,
  ClrInputModule,
  ClrModalModule,
  ClrTextareaModule,
  ClrVerticalNavModule
} from '@clr/angular';

const modules = [
  ClarityModule,
  ClrButtonModule,
  ClrCheckboxModule,
  ClrCommonFormsModule,
  ClrIconModule,
  ClrInputModule,
  ClrModalModule,
  ClrTextareaModule,
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
export class ClarityDesignSystemModule {
}
