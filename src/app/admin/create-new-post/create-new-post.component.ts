import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as PostEditorActions from '../post-editor/store/post-editor.action';

@Component({
  template: '',
})
export class CreateNewPostComponent implements OnInit {
  constructor(
    private store: Store,
  ){}

  ngOnInit(): void {
    this.createPostAndRedirect();
  }

  private createPostAndRedirect(): void {
    this.store.dispatch(PostEditorActions.createPost());
  }
}
