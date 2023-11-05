import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewPostComponent } from './create-new-post/create-new-post.component';
import { PostEditorHomeComponent } from 'src/app/post/post-editor/post-editor-home/post-editor-home.component';

const routes: Routes = [
  { path: 'new', component: CreateNewPostComponent },
  { path: ':id/edit', component: PostEditorHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostEditorRoutingModule { }
