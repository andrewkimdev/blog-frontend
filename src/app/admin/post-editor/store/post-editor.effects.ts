import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostEditorService } from '../post-editor.service';

@Injectable()
export class PostEditorEffects {
  constructor(
    private actions$: Actions,
    private postEditorService: PostEditorService,
  ){}

}
