import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ImageFileInfo } from './image-file-info.interface';
import * as PostEditorActions from '../store/post-editor.action';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {
  @Input('postId')
  postId: number | null = null;

  @Output('file-link')
  fileLink = new EventEmitter<string>();

  imageFileList: ImageFileInfo[] = [];
  imageFile!: ImageFileInfo ;

  isModalOpen: boolean = false;

  constructor(private store: Store){}

  openModal(i: number) {
    this.isModalOpen = true;
    this.imageFile = this.imageFileList[i];
  }

  handleKeyOnModal(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.isModalOpen = false;
    }
  }

  onFileUploaded(fileInfo: ImageFileInfo) {
    this.imageFileList.push(fileInfo);
  }

  onThumbnailClicked(i: number) {
    this.openModal(i);
  }

  onFileLinkUpdated(link: string) {
    this.fileLink.emit(link);
  }

  onRemovalTriggered(i: number) {
    this.imageFileList.splice(i, 1);
    this.store.dispatch(PostEditorActions.removeImage({ index: i }))
  }
}
