// Angular Core Modules
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// 한글 입력 마지막 획 잘리는 이슈 대응
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

// 3rd Party Vendor Module
import { CoreModule } from 'src/app/core/core.module';
import { ClarityDesignSystemModule } from './lib';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'

// Dev Tools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Application Modules
import { PostsModule } from './post/posts.module';
import { LayoutModule } from './layout/layout.module';
import { AdminModule } from './admin/admin.module';

// Application Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    ClarityDesignSystemModule,
    HttpClientModule,
    PostsModule,
    AdminModule,
    LayoutModule,
    AppRoutingModule,
    // NgRx Modules
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: COMPOSITION_BUFFER_MODE,
      useValue: false,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
