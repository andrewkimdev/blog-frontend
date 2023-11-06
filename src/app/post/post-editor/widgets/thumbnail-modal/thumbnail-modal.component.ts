import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Post } from 'src/app/shared/types';
import { createImageUrlFromUuid } from 'src/app/shared/functions';

import { ImageFileInfo } from '../image-uploader/image-file-info.interface';

import * as PageEditorActions from '../../store/post-editor.action';
import { selectPost } from 'src/app/post/post-editor/store/post-editor.selector';

@Component({
  selector: 'app-thumbnail-modal',
  templateUrl: './thumbnail-modal.component.html',
  styleUrls: ['./thumbnail-modal.component.scss']
})
export class ThumbnailModalComponent implements OnChanges {
  @Input('imageFile')
  fileInfo!: ImageFileInfo;

  @Input()
  open = false;

  @Output()
  openChange = new EventEmitter<boolean>();

  @Output('file-link')
  linkEmitter = new EventEmitter<string>();

  isMainImageInputControl = new FormControl(false);

  imageLink = '';

  post$: Observable<Post> = this.store.select(selectPost);

  copyButtonText = 'Insert Link'

  initialCheckValue: boolean | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store,
  ) {
  }

  private setInitialCheckboxValue(): void {
    this.post$.pipe(
      take(1),
      map((post) => post.mainImage === this.fileInfo.id),
    ).subscribe((isMainImage) => {
      this.isMainImageInputControl.setValue(isMainImage);
      this.isMainImageInputControl.markAsPristine();
      this.isMainImageInputControl.markAsUntouched();
      this.initialCheckValue = isMainImage;
    });
  }

  private setMainImage(): void {
    const currentCheckValue = this.isMainImageInputControl.value;

    if (currentCheckValue !== this.initialCheckValue) {
      if (currentCheckValue) {
        this.store.dispatch(PageEditorActions.setMainImage({ imageId: this.fileInfo.id }));
      } else {
        this.store.dispatch(PageEditorActions.unsetMainImage());
      }
    }
  }

  onCopyClicked() {
    this.copyLinkToClipboard(this.imageLink);
    this.linkEmitter.emit(this.imageLink);
    this.closeModal();
  }

  closeModal(): void {
    this.copyButtonText = 'Insert Link';
    this.cdr.detectChanges();
    this.openChange.emit(false);
    this.setMainImage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const info = changes['fileInfo'];
    const open = changes['open'];

    if (open?.currentValue) {
      this.setInitialCheckboxValue();
    }
    if (info) {
      this.imageLink = createImageUrlFromUuid(info.currentValue.id);
    }
  }

  private copyLinkToClipboard(str: string) {
    const clipboardItem = new ClipboardItem({ 'text/plain': new Blob([str], { type: 'text/plain' }) });

    // Use the Clipboard API to write the item to the clipboard
    navigator.clipboard.write([clipboardItem]).then(() => {
      this.copyButtonText = 'Insert Link'
      this.cdr.detectChanges();
    }).catch((err: any) => {
      console.error('Could not copy text to clipboard', err);
    });
  }
}
