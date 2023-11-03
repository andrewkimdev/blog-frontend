import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, map, Subject, takeUntil, tap } from 'rxjs';

import { FormControl, ValidationErrors, Validators } from '@angular/forms';

import { updateTitle } from '../store/post-editor.action';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit, OnDestroy {
  titleInputControl = new FormControl(
    '',
    [Validators.required, Validators.minLength(6), Validators.maxLength(50)],
  );

  private destroy$ = new Subject<void>();

  constructor(private store: Store){}

  ngOnInit() {
    this.titleInputControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      map((value) => value ?? ''),
      debounceTime(300),
      distinctUntilChanged(),
      tap((title) => this.store.dispatch(updateTitle({ title }))),
    ).subscribe();
  }

  inputControlError(): ValidationErrors | null {
    if (this.titleInputControl.touched && this.titleInputControl.errors) {
      return this.titleInputControl.errors || null;
    }
    return null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
