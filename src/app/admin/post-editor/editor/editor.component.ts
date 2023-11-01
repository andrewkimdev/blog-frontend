import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnChanges, OnDestroy {

  @Input('added-text-at-cursor')
  addedTextAtCursor: string | null = null;

  @Output('text')
  textOutput = new EventEmitter<string>();

  @ViewChild('textarea', { static: false })
  textarea!: ElementRef;

  cursorPosition: number | null = null;
  saveCursorLocation(){
    const textareaElem = this.textarea.nativeElement;
    this.cursorPosition = textareaElem.selectionStart;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const addedText = changes['addedTextAtCursor'];
    if (addedText) {
      this.appendText(addedText.currentValue);
    }
  }

  private appendText(addedText: string) {
    const p = '\n'
    const before = this.textInputFormControl.value?.substring(0, this.cursorPosition ?? 0);
    const interim = addedText;
    const after = this.textInputFormControl.value?.substring(this.cursorPosition ?? 0);
    this.textInputFormControl.setValue(before + p + interim + p + after);
  }

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
      map((value: string | null) => value ?? ''),
      tap((text: string) => this.textOutput.emit(text))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
