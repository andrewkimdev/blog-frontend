// Angular Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 3rd Party Vendor Modules
import { NgxMarkdownModule } from '../lib';

// Custom Shared Modules
import { CoreModule } from 'src/app/core/core.module';

// Application Components
import { DashboardComponent } from './dashboard/dashboard.component';


// Routing Module
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    NgxMarkdownModule,
    AdminRoutingModule,
  ]
})
export class AdminModule {
}
