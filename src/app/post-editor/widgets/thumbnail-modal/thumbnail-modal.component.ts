import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ImageFileInfo } from '../image-uploader/image-file-info.interface';

import * as PageEditorActions from '../../store/post-editor.action';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-thumbnail-modal',
  templateUrl: './thumbnail-modal.component.html',
  styleUrls: ['./thumbnail-modal.component.scss']
})
export class ThumbnailModalComponent implements OnInit, OnChanges, OnDestroy {
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

  copyButtonText = 'Insert Link'

  private destroy$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.isMainImageInputControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      tap((res) =>
        res
          ? this.store.dispatch(PageEditorActions.setMainImage({ imageId: this.fileInfo.id }))
          : this.store.dispatch(PageEditorActions.unsetMainImage())
      ),
    ).subscribe();
  }

  onCopyClicked() {
    this.copyLinkToClipboard(this.imageLink);
    this.emitLink(this.imageLink);
    this.closeModal();
  }

  emitLink(link: string) {
    this.linkEmitter.emit(link);
  }

  closeModal(): void {
    this.copyButtonText = 'Insert Link';
    this.cdr.detectChanges();
    this.openChange.emit(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const info = changes['fileInfo'];
    if (changes['fileInfo']) {
      this.imageLink = `![image](${ environment.baseUrl }/images/${ info.currentValue.id })`;
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
