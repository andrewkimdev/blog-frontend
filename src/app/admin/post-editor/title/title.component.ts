import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit, OnDestroy {
  @Output('title')
  titleOutput = new EventEmitter<string>();

  titleInputControl = new FormControl(
    '',
    [Validators.required, Validators.minLength(6), Validators.maxLength(50)],
  )

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.titleInputControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      map((value) => value || ''),
      tap((text) => this.titleOutput.emit(text))
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
