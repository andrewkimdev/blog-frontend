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
import { debounceTime, filter, map, skip, Subject, take, takeUntil, tap } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Post } from 'src/app/shared/types';
import { getErrorMessageForControl } from 'src/app/shared/functions';

import { setBodyText } from '../../store/post-editor.action';
import { selectPost } from '../../store/post-editor.selector';

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

  post$ = this.store.select(selectPost);

  getErrorMessages = getErrorMessageForControl;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
  ) {
  }

  saveCursorLocation() {
    const textareaElem = this.textarea.nativeElement;
    this.cursorPosition = textareaElem.selectionStart;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const addedText = changes['addedTextAtCursor'];
    if (addedText.currentValue) {
      this.appendText(addedText.currentValue);
    }
  }

  ngOnInit(): void {
    this.reactToInputControlChanges();
    this.setInitialValue();
  }

  preventDefault(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private reactToInputControlChanges(): void {
    this.textInputFormControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      skip(1),
      map((value: string | null) => value ?? ''),
      debounceTime(300),
      tap((body: string) => this.store.dispatch(setBodyText({ body }))),
    ).subscribe();
  }

  private setInitialValue(): void {
    this.post$.pipe(
      filter((post: Post) => !!post.id),
      take(1),
      tap((post: Post) => {
        this.textInputFormControl.setValue(post.body);
        this.textInputFormControl.markAsPristine();
      }),
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
