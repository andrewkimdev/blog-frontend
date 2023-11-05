import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SinglePostHome } from 'src/app/post/single-post/single-post-home/single-post-home.component';

const postRoutes: Routes = [
  { path: '', component: SinglePostHome }
]
@NgModule({
  imports: [RouterModule.forChild(postRoutes)],
  exports: [RouterModule]
})
export class SinglePostRoutingModule { }
