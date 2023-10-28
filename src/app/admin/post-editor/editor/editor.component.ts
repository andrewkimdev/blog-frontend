import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  @Output('text')
  textOutput = new EventEmitter<string>();

  private destroy$ = new Subject<void>();

  textInputFormControl = new FormControl(
    '',
    [Validators.required, Validators.minLength(6), Validators.maxLength(10000)],
  );

  inputControlError(): ValidationErrors | null {
    if (this.textInputFormControl.touched && this.textInputFormControl.errors) {
      return this.textInputFormControl.errors || null;
    }
    return null;
  }

  ngOnInit(): void {
    this.textInputFormControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      map((value: string | null) => value || ''),
      tap((text: string) => this.textOutput.emit(text))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
