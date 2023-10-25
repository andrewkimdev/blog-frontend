import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home', title: 'Real Home' },
  { path: 'home', component: HomeComponent, title: 'HomeComponent' },
  {
    path: 'about-me',
    loadComponent: () => import('./about-me/about-me.component').then(c => c.AboutMeComponent),
    title: 'About Me',
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    title: 'Admin',
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule),
    title: 'App/Posts'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page Not Found Component'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
