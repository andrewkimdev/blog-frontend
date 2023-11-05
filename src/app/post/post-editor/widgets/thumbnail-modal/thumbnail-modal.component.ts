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
import { map, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectPost } from 'src/app/post/post-editor/store/post-editor.selector';
import { Post } from 'src/app/shared/types';

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

  post$: Observable<Post> = this.store.select(selectPost);

  copyButtonText = 'Insert Link'

  private destroy$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.setInitialCheckboxValue();
    this.isMainImageInputControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      tap((res) =>{
        if (res){
          this.store.dispatch(PageEditorActions.setMainImage({ imageId: this.fileInfo.id }))
        } else if (!res && this.isMainImageInputControl.dirty) {
          this.store.dispatch(PageEditorActions.unsetMainImage());
        }
      }),
    ).subscribe();
  }

  private setInitialCheckboxValue(): void {
    // todo - debug the initial checkbox logic
    this.post$.pipe(
      take(1),
      tap((post) => {
        console.log(this.fileInfo.id);
        console.log(post.mainImage);
        console.log(this.fileInfo.id === post.mainImage);
      }),
      map((post) => post.mainImage === this.fileInfo.id),
    ).subscribe((isMainImage) => {

      this.isMainImageInputControl.setValue(isMainImage);
      this.isMainImageInputControl.markAsPristine();
      this.isMainImageInputControl.markAsUntouched();
    });
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
    if (changes['open'] && changes['open'].currentValue) {
      this.setInitialCheckboxValue();
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
