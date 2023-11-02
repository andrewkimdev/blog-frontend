import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsHomeComponent } from './posts-home/posts-home.component';

const postsRoutes: Routes = [
  {
    path: 'posts',
    component: PostsHomeComponent,
    title: 'Posts',
  },
  {
    path: 'posts/:id',
    loadChildren: () => import('../single-post/single-post.module').then((m) => m.SinglePostModule),
    title: 'Post Individual',
  },
];

@NgModule({
  imports: [RouterModule.forChild(postsRoutes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
