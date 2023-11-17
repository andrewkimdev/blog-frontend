// Angular Core Modules
import { Component, inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

// 3rd Party Vendor Modules
import {COMMA, ENTER, SEMICOLON} from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Store } from '@ngrx/store';

// State Management
import * as PostEditorAction from '../../store/post-editor.action';
import { selectPostTags } from 'src/app/post/post-editor/store/post-editor.selector';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {

  // Delimiters for tag input
  @Input()
  tagDelimitersCodes = [COMMA, SEMICOLON];

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = []; // Initialize this with your actual tags

  tagInputControl = new FormControl('');

  announcer = inject(LiveAnnouncer);

  constructor(private store: Store) {
    // Fetch tags from the store and update `tags` array
    this.store.select(selectPostTags).subscribe((tagsFromStore) => {
      this.tags = tagsFromStore;
    });
  }

  tagLabels$ = this.store.select(selectPostTags);

  remove(tag: string): void {
    this.store.dispatch(PostEditorAction.removeTag({ tag }));

    this.announcer.announce(`Removed ${ tag }`).then();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.store.dispatch(PostEditorAction.addTag({ tag: value }));
      this.tagInputControl.setValue('');
    }
  }
  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Here you might need to handle the editing logic
    // For now, it just updates the tag if it's not empty
    if (!value) {
      this.remove(tag);
      return;
    }

    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      // Update the tag in your store as necessary
      this.tags[index] = value;
    }
  }
}
