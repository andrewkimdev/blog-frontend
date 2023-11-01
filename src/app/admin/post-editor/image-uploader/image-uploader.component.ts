import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageFileInfo } from './image-file-info.interface';

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
  }
}
