import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutMeComponent } from './about-me/about-me.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'posts' },
  { path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule) },
  { path: 'about-me', loadComponent: () => import('./about-me/about-me.component').then(c => c.AboutMeComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentsRoutingModule { }
