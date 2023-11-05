import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewPostComponent } from './create-new-post/create-new-post.component';
import { PostEditorComponent } from './post-editor/post-editor.component';

const routes: Routes = [
  { path: 'new', component: CreateNewPostComponent },
  { path: ':id/edit', component: PostEditorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostEditorRoutingModule { }
