import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withDebugTracing } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule) },
  { path: 'about-me', loadComponent: () => import('./about-me/about-me.component').then(c => c.AboutMeComponent)},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withDebugTracing())
  ]
})
export class AppRoutingModule { }
