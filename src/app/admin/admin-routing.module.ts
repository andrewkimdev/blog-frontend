import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostEditorComponent } from 'src/app/admin/post-editor/post-editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'posts/:id/edit', component: PostEditorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
