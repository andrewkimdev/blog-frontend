import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Dev Only
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { PostService } from './posts/widgets/post/post.service';

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
    HttpClientInMemoryWebApiModule.forRoot(PostService),
    PostsModule,
    AdminModule,
    LayoutModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
