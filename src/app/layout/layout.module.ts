import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../shared/lib';

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
    RouterLink,
    MaterialModule,
    RouterLinkActive,
  ],
  declarations: [
    ...LayoutComponents,
  ],
  exports: [
    ...LayoutComponents,
  ]
})
export class LayoutModule {
}
