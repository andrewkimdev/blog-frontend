import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit, OnDestroy {
  @Output('isDraft')
  isDraftEventEmitter = new EventEmitter<boolean>();

  @Output('save')
  save = new EventEmitter<void>();

  @Output('cancel')
  cancel = new EventEmitter<void>();

  isDraftInputControl = new FormControl(false);

  private destroy$ = new Subject<void>();

  onSaveButtonClicked(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.save.emit();
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
      tap((value) => this.isDraftEventEmitter.emit(value)),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
