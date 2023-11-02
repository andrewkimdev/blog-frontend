import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setIsDraftState, save } from '../store/post-editor.action';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit, OnChanges, OnDestroy {
  @Output('cancel')
  cancel = new EventEmitter<void>();

  isDraftInputControl = new FormControl(false);

  constructor(private store: Store){}

  private destroy$ = new Subject<void>();

  onSaveButtonClicked(): void {
    this.store.dispatch(save());
  }

  onCancelButtonClicked(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.cancel.emit();
  }

  ngOnInit(): void {
    this.isDraftInputControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      map((value) => !!value),
      tap((isDraft: boolean) => this.store.dispatch(setIsDraftState({ isDraft }))),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isSaveEnabled = changes['isSaveEnabled'].currentValue;
    if (changes['isSaveEnabled']) {
      console.log('isSaveEnabled: ' + isSaveEnabled);
    }
  }
}
