import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsHomeComponent } from './posts-home/posts-home.component';
import { PostComponent } from './widgets/post/post.component';

const postsRoutes: Routes = [
  {
    path: '',
    component: PostsHomeComponent,
    title: 'Posts Home Component',
    children: [
      {
        path: 'posts/:id',
        component: PostComponent,
        title: 'Post Component',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(postsRoutes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
