import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withDebugTracing } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contents', loadChildren: () => import('./contents/contents.module').then(m => m.ContentsModule) },
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
