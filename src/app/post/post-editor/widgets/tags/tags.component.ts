// Angular Core Modules
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, filter, map, merge, Subject, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

// 3rd Party Vendor Modules
import '@cds/core/icon/register.js';
import { ClarityIcons, timesIcon } from '@cds/core/icon';

// State Management
import * as PostEditorAction from '../../store/post-editor.action';
import { selectPostTags } from 'src/app/post/post-editor/store/post-editor.selector';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {

  // Delimiters for tag input
  @Input()
  tagDelimiters = [',', ';'];

  tagsInputControl = new FormControl('');
  enterKeyPressed$ = new Subject<void>();

  private destroy$ = new Subject<void>();
  tagLabels$ = this.store.select(selectPostTags);

  constructor(private store: Store){}
  ngOnInit(): void {
    this.setupTagInput();
    ClarityIcons.addIcons(timesIcon);
  }

  onSpecialKeyPressed(event: KeyboardEvent): void {
    if (['Enter', 'Tab'].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      this.enterKeyPressed$.next();
    }
  }

  removeTag(tag: string): void {
    this.store.dispatch(PostEditorAction.removeTag({ tag }));
  }

  private addTag(): void {
    const tag: string = this.getTagFromInputControl();
    if (tag.trim()) {
      this.store.dispatch(PostEditorAction.addTag({ tag }));
    }
  }

  private getTagFromInputControl(): string {
    const charactersToRemove = this.tagDelimiters; // This array can be external
    const regexStr = '[' + charactersToRemove.join('') + ']'; // Construct the regular expression string
    const regex = new RegExp(regexStr, 'g'); // Create the RegExp object

    return this.tagsInputControl.value?.replace(regex, '').trim() || '';
  }

  private setupTagInput(): void {
    const enterKeyPressed$ = this.enterKeyPressed$;

    const commaSeparated$ = this.tagsInputControl.valueChanges.pipe(
      filter((tag) => !!tag),
      map((tag) => tag as string),
      map((tag: string) => this.tagDelimiters.some(char => tag.includes(char))),
      filter((tag) => tag),
    );

    merge(commaSeparated$, enterKeyPressed$).pipe(
      takeUntil(this.destroy$),
      debounceTime(0), // Needed to fix Hangul input error - last character is appended without this hack.
      tap(() => this.addTag()),
      tap(() => this.tagsInputControl.setValue('')),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
