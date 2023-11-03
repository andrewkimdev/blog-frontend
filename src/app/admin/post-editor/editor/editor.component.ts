import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { debounceTime, map, Subject, takeUntil, tap } from 'rxjs';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { updateText } from '../store/post-editor.action';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnChanges, OnDestroy {

  @Input('added-text-at-cursor')
  addedTextAtCursor: string | null = null;

  @ViewChild('textarea', { static: false })
  textarea!: ElementRef;

  cursorPosition: number | null = null;
  textInputFormControl = new FormControl(
    '',
    [Validators.required, Validators.minLength(6), Validators.maxLength(10000)],
  );
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
  }

  saveCursorLocation() {
    const textareaElem = this.textarea.nativeElement;
    this.cursorPosition = textareaElem.selectionStart;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const addedText = changes['addedTextAtCursor'];
    if (addedText) {
      this.appendText(addedText.currentValue);
    }
  }

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
      debounceTime(300),
      tap((text: string) => this.store.dispatch(updateText({ text }))),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private appendText(addedText: string) {
    const p = '\n'
    const before = this.textInputFormControl.value?.substring(0, this.cursorPosition ?? 0);
    const interim = addedText;
    const after = this.textInputFormControl.value?.substring(this.cursorPosition ?? 0);
    this.textInputFormControl.setValue(before + p + interim + p + after);
  }
}
