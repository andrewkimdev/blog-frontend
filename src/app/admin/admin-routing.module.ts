import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsManagerComponent } from 'src/app/admin/posts-manager/posts-manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'posts', component: PostsManagerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
