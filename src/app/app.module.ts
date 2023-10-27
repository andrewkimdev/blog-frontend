import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { CoreModule } from 'src/app/core/core.module';

import { AppRoutingModule } from './app-routing.module';

import { PostsModule } from './posts/posts.module';
import { LayoutModule } from './layout/layout.module';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { PostService } from './posts/widgets/post/post.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    // Angular Core Modules
    BrowserModule,
    BrowserAnimationsModule,
    // For Dev
    HttpClientInMemoryWebApiModule.forRoot(PostService),
    // Meta Modules
    CoreModule,
    // Feature Modules
    PostsModule,
    AdminModule,
    LayoutModule,
    // Routing Modules
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
