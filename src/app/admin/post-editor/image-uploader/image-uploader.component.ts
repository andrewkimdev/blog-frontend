import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {
  @Input('postId')
  postId: number | null = null;
  thumbnailUrlList: ArrayBuffer[] = [];
  thumbnailUrl!: ArrayBuffer;

  isModalOpen: boolean = false;

  openModal(i: number) {
    this.isModalOpen = true;
    this.thumbnailUrl = this.thumbnailUrlList[i];
  }

  handleKeyOnModal(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.isModalOpen = false;
    }
  }

  onFileUploaded(thumbnailUrl: ArrayBuffer) {
    this.thumbnailUrlList.push(thumbnailUrl);
  }

  onThumbnailClicked(i: number) {
    this.openModal(i);
  }
}
