import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { ClarityDesignSystemModule } from '../lib';

import { HeaderNavComponent } from './header-nav/header-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopHeaderComponent } from './top-header/top-header.component';

const LayoutComponents = [
  HeaderNavComponent,
  SideNavComponent,
  TopHeaderComponent,
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ClarityDesignSystemModule,
    RouterLink,
    RouterLinkActive,
  ],
  declarations: [
    ...LayoutComponents,
  ],
  exports: [
    ...LayoutComponents,
  ]
})
export class LayoutModule{}
