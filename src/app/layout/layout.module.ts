import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../shared/lib';

import { MainNavComponent } from './main-nav/main-nav.component';
import { SideNavListComponent } from './side-nav-list/side-nav-list.component';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { SideNavComponent } from './side-nav/side-nav.component';

const LayoutComponents = [
  MainNavComponent,
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterLink,
    MaterialModule,
    RouterLinkActive,
    RouterOutlet,
  ],
  declarations: [
    MainNavComponent,
    SideNavListComponent,
    TopToolbarComponent,
    SideNavComponent,
  ],
  exports: [
    ...LayoutComponents,
  ]
})
export class LayoutModule {
}
