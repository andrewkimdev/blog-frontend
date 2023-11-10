import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ImageFileInfo } from './image-file-info.interface';
import * as PostEditorActions from '../../store/post-editor.action';

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

  constructor(
    private store: Store,
  ) {
  }

  onFileUploaded(fileInfo: ImageFileInfo) {
    this.imageFileList.push(fileInfo);
  }

  onRemovalTriggered(i: number) {
    this.imageFileList.splice(i, 1);
    this.store.dispatch(PostEditorActions.removeImage({ index: i }))
  }
}
