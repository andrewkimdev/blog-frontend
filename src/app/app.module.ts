// Angular Core Modules
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// 한글 입력 마지막 획 잘리는 이슈 대응
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { AuthEffects } from 'src/app/account/store/auth.effects';
import { authReducer } from 'src/app/account/store/auth.reducers';

// 3rd Party Vendor Module
import { CoreModule } from 'src/app/core/core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'

// Dev Tools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthInterceptor } from 'src/app/core/http-interceptors/auth.interceptor';

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
    HttpClientModule,
    PostsModule,
    AdminModule,
    LayoutModule,
    AppRoutingModule,
    // NgRx Modules
    StoreModule.forRoot({'authFeatureKey': authReducer}, {}),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: COMPOSITION_BUFFER_MODE,
      useValue: false,
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
