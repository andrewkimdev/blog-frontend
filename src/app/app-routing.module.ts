import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { adminGuard } from './core/guards/admin.guard';

import { HomeComponent } from './home/home.component';
import { NotAuthorizedComponent } from './core/pages/not-authorized/not-authorized.component';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';

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
    loadChildren: () => import('./post/posts.module').then(m => m.PostsModule),
  },
  {
    path: 'about-me',
    title: 'About Me',
    loadComponent: () => import('./about-me/about-me.component').then(c => c.AboutMeComponent),
  },
  {
    path: 'account',
    title: 'All Auth-related components',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
  },
  {
    path: 'admin',
    title: 'Admin',
    canActivate: [adminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'not-authorized',
    title: 'Not Authorized',
    component: NotAuthorizedComponent,
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
export class AppRoutingModule {
}
