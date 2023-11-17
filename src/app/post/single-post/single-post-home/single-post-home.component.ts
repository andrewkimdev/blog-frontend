import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';


import { selectSinglePost } from 'src/app/post/single-post/store/post.selector';
import * as PostAction from '../store/post.action';

import { supabase } from 'src/app/shared/lib';

import { Post } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-post-home',
  templateUrl: './single-post-home.component.html',
  styleUrls: ['./single-post-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePostHome implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    const id = this.getPostId();
    this.store.dispatch(PostAction.loadPostByIdFromCache({ id }));
  }

  post$: Observable<Post> = this.store.select(selectSinglePost);

  private getPostId(): number {
    return +this.route.snapshot.params['id'];
  }

  editPost(): void {
    const id = this.getPostId();
    this.store.dispatch(PostAction.moveToEditorRoute({ id }));
  }

  getImageUrl(str: string | null): string {

    if (!str) {
      // todo - return a generic main message for the category or other key words.
      return ''
    }
    const { data } = supabase.storage.from('images').getPublicUrl(str);
    return data.publicUrl;
  }
}
