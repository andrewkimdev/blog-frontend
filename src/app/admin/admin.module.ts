// Angular Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PostsManagerEffects } from './posts-manager/store/posts-manager.effects';
import { postsManagerReducer } from './posts-manager/store/posts-manager.reducer';

// 3rd Party Vendor Modules
import { MaterialModule, NgxMarkdownModule } from 'src/app/shared/lib';

// Custom Shared Modules
import { CoreModule } from 'src/app/core/core.module';

// Application Components
import { DashboardComponent } from './dashboard/dashboard.component';


// Routing Module
import { AdminRoutingModule } from './admin-routing.module';
import { PostsManagerComponent } from './posts-manager/posts-manager.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PostsManagerComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    NgxMarkdownModule,
    StoreModule.forFeature('postsManagerFeatureKey', postsManagerReducer,),
    EffectsModule.forFeature([PostsManagerEffects]),
    AdminRoutingModule,
  ]
})
export class AdminModule {
}
