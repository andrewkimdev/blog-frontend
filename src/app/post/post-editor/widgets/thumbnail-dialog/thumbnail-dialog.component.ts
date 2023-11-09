import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ImageFileInfo } from '../image-uploader/image-file-info.interface';
import * as PageEditorActions from '../../store/post-editor.action';
import { createImageUrlFromUuid } from '../../../../shared/functions';
import { map, Observable, take, tap } from 'rxjs';
import { Post } from '../../../../shared/types';
import { selectPost } from '../../store/post-editor.selector';

@Component({
  selector: 'app-thumbnail-dialog',
  templateUrl: './thumbnail-dialog.component.html',
  styleUrls: ['./thumbnail-dialog.component.scss']
})
export class ThumbnailDialogComponent implements OnInit {
  @Input('imageFile')
  fileInfo!: ImageFileInfo;

  @Output('file-link')
  linkEmitter = new EventEmitter<string>();

  isMainImageInputControl = new FormControl(false);
  copyButtonText = 'Insert Link'
  imageLink = '';

  initialCheckValue: boolean | null = null;

  ngOnInit(): void {
    this.setInitialCheckboxValue();
    this.imageLink = createImageUrlFromUuid(this.data.fileInfo.id);
  }

  constructor(
    public dialogRef: MatDialogRef<ThumbnailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fileInfo: ImageFileInfo },
    private cdr: ChangeDetectorRef,
    private store: Store,
  ){}

  onCopyClicked() {
    console.log(this.imageLink);
    this.copyLinkToClipboard(this.imageLink);
    this.linkEmitter.emit(this.imageLink);
    this.closeModal();
  }

  closeModal(): void {
    this.copyButtonText = 'Insert Link';
    this.cdr.detectChanges();
    this.setMainImage();
    this.dialogRef.close();
  }


  private setMainImage(): void {
    const currentCheckValue = this.isMainImageInputControl.value;

    if (currentCheckValue !== this.initialCheckValue) {
      if (currentCheckValue) {
        this.store.dispatch(PageEditorActions.setMainImage({ imageId: this.data.fileInfo.id }));
      } else {
        this.store.dispatch(PageEditorActions.unsetMainImage());
      }
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

  post$: Observable<Post> = this.store.select(selectPost);

  private setInitialCheckboxValue(): void {
    this.post$.pipe(
      take(1),
      tap((res) => console.log(res)),
      tap(() => console.log(this.data.fileInfo)),
      map((post) => post.mainImage === this.data.fileInfo.id),
    ).subscribe((isMainImage) => {
      this.isMainImageInputControl.setValue(isMainImage);
      this.isMainImageInputControl.markAsPristine();
      this.isMainImageInputControl.markAsUntouched();
      this.initialCheckValue = isMainImage;
    });
  }
}
