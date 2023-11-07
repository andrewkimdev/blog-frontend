import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsHomeComponent } from './post-list/posts-home/posts-home.component';
import { CreateNewPostComponent } from './create-new-post/create-new-post.component';

const postsRoutes: Routes = [
  {
    path: 'posts',
    component: PostsHomeComponent,
    title: 'Posts',
    pathMatch: 'full',
  },
  {
    path: 'posts/new',
    component: CreateNewPostComponent,
    title: 'Get ID from server and redirect to post creation',
  },
  {
    path: 'posts/:id/edit',
    loadChildren: () => import('./post-editor/post-editor.module').then((m) => m.PostEditorModule),
    title: 'Edit Post',
  },
  {
    path: 'posts/:id',
    loadChildren: () => import('./single-post/single-post.module').then((m) => m.SinglePostModule),
    title: 'Post Individual',
  },
];

@NgModule({
  imports: [RouterModule.forChild(postsRoutes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {
}
