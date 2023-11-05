import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as PostEditorAction from '../../store/post-editor.action';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit, OnDestroy {
  isDraftInputControl = new FormControl(false);
  private destroy$ = new Subject<void>();

  constructor(private store: Store){}

  onSaveButtonClicked(): void {
    this.store.dispatch(PostEditorAction.savePost());
  }

  onCancelButtonClicked(): void {
    this.store.dispatch(PostEditorAction.abandonPostEdit());
  }

  ngOnInit(): void {
    this.isDraftInputControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      map((value) => !!value),
      tap((isDraft: boolean) => this.store.dispatch(PostEditorAction.setIsDraftState({ isDraft }))),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
