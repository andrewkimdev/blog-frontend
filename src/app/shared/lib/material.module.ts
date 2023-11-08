import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

const matModules = [
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...matModules,
  ],
  exports: [
    ...matModules,
  ],
})
export class MaterialModule { }
