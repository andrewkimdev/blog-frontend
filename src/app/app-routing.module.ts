import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    title: 'HomeComponent',
    component: HomeComponent,
  },
  {
    path: 'posts',
    title: 'Posts',
    loadChildren: () => import('./posts/posts.module')
      .then(m => m.PostsModule),
  },
  {
    path: 'post-editor',
    title: 'Post Editor',
    loadChildren: () => import('./post-editor/post-editor.module').then(m => m.PostEditorModule),
  },
  {
    path: 'about-me',
    title: 'About Me',
    loadComponent: () => import('./about-me/about-me.component')
      .then(c => c.AboutMeComponent),
  },
  {
    path: 'admin',
    title: 'Admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule),
  },
  {
    path: '**',
    title: 'Page Not Found',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
