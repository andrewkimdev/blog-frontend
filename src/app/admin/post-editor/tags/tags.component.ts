// Angular Core Modules
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, debounceTime, filter, map, merge, Subject, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';

// 3rd Party Vendor Modules
import '@cds/core/icon/register.js';
import { ClarityIcons, timesIcon } from '@cds/core/icon';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {
  // User-added tags
  @Output()
  tags = new EventEmitter<string[]>;

  // Delimiters for tag input
  @Input()
  tagDelimiters = [',', ';'];

  tagsInputControl = new FormControl('');
  enterKeyPressed$ = new Subject<void>();

  private destroy$ = new Subject<void>();
  private tagLabelsSubject = new BehaviorSubject<string[]>([]);
  tagLabels$ = this.tagLabelsSubject.asObservable();

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

  removeTag(selectedTag: string): void {
    const currentTags: string[] = this.tagLabelsSubject.value;
    const updatedTags: string[] = currentTags.filter((tag: string) => tag !== selectedTag);
    this.updateTags(updatedTags);
  }

  private addTag(): void {
    const tags: string[] = this.tagLabelsSubject.value;
    const tag: string = this.getTagFromInputControl();
    if (!tag || tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())) {
      return;
    }
    tags.push(tag);
    this.updateTags(tags);
  }

  private updateTags(tags: string[]) {
    this.tagLabelsSubject.next(tags);
    this.tags.emit(tags);
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
