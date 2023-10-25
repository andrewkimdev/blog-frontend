import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsHomeComponent } from './posts-home/posts-home.component';
import { PostComponent } from './widgets/post/post.component';

const postsRoutes: Routes = [
  {
    path: 'posts',
    component: PostsHomeComponent,
    title: 'Posts',
    children: [
      {
        path: ':id',
        component: PostComponent,
        title: 'Post Individual',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(postsRoutes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
