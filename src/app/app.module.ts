// Angular Core Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// 한글 입력 마지막 획 잘리는 이슈 대응
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

// Dev Only
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { PostMockService } from './posts/services/post-mock.service';

// 3rd Party Vendor Module
import { CoreModule } from 'src/app/core/core.module';
import { ClarityDesignSystemModule } from './lib';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

import { PostsModule } from './posts/posts.module';

import { LayoutModule } from './layout/layout.module';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

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
    HttpClientInMemoryWebApiModule.forRoot(PostMockService),
    PostsModule,
    AdminModule,
    LayoutModule,
    AppRoutingModule,
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
