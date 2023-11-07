import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostEditorHomeComponent } from './post-editor-home/post-editor-home.component';

const routes: Routes = [
  { path: '', component: PostEditorHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostEditorRoutingModule { }
